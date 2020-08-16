<template>
  <div class="page">
    <div class="main">
      <Navbar />
      <div class="card border-0 mb-4 text-left">
        <img
          :src="
            page.image
              ? page.image
              : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
          "
          class="card-img-top"
          :alt="page.slug"
        />
        <div class="card-body p-3">
          <h5 class="card-title">{{ page.name }}</h5>
          <p class="card-text">
            <span>@{{ page.slug }}</span>
            <span>{{ page.description }}</span>
            <span>{{ page.location }}</span>
            <span>{{ page.phone }}</span>
            <span>{{ page.mobile }}</span>
            <small class="text-muted"
              ><span class="text-dark">@{{ page.slug }}</span
              ><br /><span v-if="page.cityIdName">{{ page.cityIdName }}</span
              ><span v-if="page.stateIdName">, {{ page.stateIdName }}</span
              ><span v-if="page.stateIdName || page.stateIdName"> - </span
              ><span v-if="page.countryIdName">{{
                page.countryIdName
              }}</span></small
            >
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div>
        <nav class="nav nav-pills flex-column flex-sm-row mb-4">
          <a
            class="flex-sm-fill text-sm-center nav-link active"
            id="pills-comment-tab"
            data-toggle="pill"
            href="#pills-comment"
            role="tab"
            aria-controls="pills-comment"
            aria-selected="true"
            >Texto</a
          >
          <a
            class="flex-sm-fill text-sm-center nav-link"
            id="pills-image-tab"
            data-toggle="pill"
            href="#pills-image"
            role="tab"
            aria-controls="pills-image"
            aria-selected="false"
            >Imagen</a
          >
          <a
            class="flex-sm-fill text-sm-center nav-link"
            id="pills-video-tab"
            data-toggle="pill"
            href="#pills-video"
            role="tab"
            aria-controls="pills-video"
            aria-selected="false"
            >Video</a
          >
        </nav>
        <div class="tab-content mb-3" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-comment"
            role="tabpanel"
            aria-labelledby="pills-comment-tab"
          >
            <form @submit.prevent="addComment">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.title"
                  id="title"
                  placeholder="Título"
                />
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="texto"
                  rows="3"
                  v-model="form.texto"
                  placeholder="¿Qué estás pensando?. Escribelo aquí..."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Comentar
              </button>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="pills-image"
            role="tabpanel"
            aria-labelledby="pills-image-tab"
          >
            <form @submit.prevent="addImage">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.title"
                  id="title"
                  placeholder="Título"
                />
              </div>
              <div class="custom-file mb-3">
                <input
                  type="file"
                  class="custom-file-input"
                  id="image"
                  lang="es"
                />
                <label
                  class="custom-file-label text-left"
                  for="image"
                  data-browse="Buscar"
                  >Seleccionar imagen</label
                >
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="texto"
                  rows="3"
                  v-model="form.texto"
                  placeholder="¿Qué estás pensando?. Escribelo aquí..."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Comentar
              </button>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="pills-video"
            role="tabpanel"
            aria-labelledby="pills-video-tab"
          >
            <form @submit.prevent="addPost">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.title"
                  id="title"
                  placeholder="Título"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.video"
                  id="video"
                  placeholder="Video Youtube"
                />
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="texto"
                  rows="3"
                  v-model="form.texto"
                  placeholder="¿Qué estás pensando?. Escribelo aquí..."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Comentar
              </button>
            </form>
          </div>
        </div>

        <Post
          v-for="(item, index) in posts"
          :key="index"
          :id="item._id"
          :pageId="item.pageId"
          :content="item.content"
          :image="item.image"
          :video="item.video"
          :share="item.share"
          :status="item.status"
          :views="item.views"
          :createdAt="item.createdAt"
          :isActive="item.isActive"
          :isLock="item.isLock"
        />

        <div class="alert alert-light" role="alert" v-if="posts.length === 0">
          No hay publicaciones :(
        </div>
      </div>
    </div>
    <pre class="container text-left text-white">{{ getPostsPerPage }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import axios from "axios";
import { db } from "@/main";

import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default {
  name: "Page",
  components: {
    Navbar,
    Post
  },
  data() {
    return {
      form: {
        texto: null,
        title: null,
        video: null
      },
      page: "",
      posts: []
    };
  },
  created() {
    this.getPage();
    this.getPosts();
    this.fetchPostsPerPage(this.$route.params.id);
  },
  methods: {
    ...mapActions(["fetchPostsPerPage"]),
    async getPosts() {
      await axios
        .get(`${db}/pages/${this.$route.params.id}/posts`)
        .then(async response => {
          this.posts = await response.data;
        })
        .catch(e => console.log(e));
    },
    async getPage() {
      await axios
        .get(`${db}/pages/${this.$route.params.id}`)
        .then(async response => {
          this.page = {
            _id: await response.data._id,
            name: await response.data.name,
            slug: await response.data.slug,
            userId: await response.data.userId,
            geoLat: await response.data.geo.lat,
            geoLon: await response.data.geo.lon,
            image: await response.data.image,
            description: await response.data.description,
            location: await response.data.location,
            phone: await response.data.phone,
            mobile: await response.data.mobile,
            countryId: await response.data.countryId._id,
            countryIdName: await response.data.countryId.name,
            countryIdSlug: await response.data.countryId.slug,
            stateId: await response.data.stateId._id,
            stateIdCode: await response.data.stateId.code,
            stateIdName: await response.data.stateId.name,
            cityId: await response.data.cityId._id,
            cityIdCode: await response.data.cityId.code,
            cityIdName: await response.data.cityId.name,
            isActive: await response.data.isActive,
            isLock: await response.data.isLock,
            createdAt: await response.data.createdAt
          };
        })
        .catch(e => console.log(e));
    },
    async addComment() {},
    async addImage() {},
    async addVideo() {},
    async addPost() {}
  },
  computed: {
    ...mapGetters(["getPostsPerPage"])
  }
};
</script>

<style scoped>
.card-img-top {
  height: 263.25px;
  object-fit: cover;
  position: center center;
}
</style>
