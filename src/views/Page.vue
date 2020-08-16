<template>
  <div class="page">
    <div class="main">
      <Navbar />
      <div class="card border-0 mb-4 text-left">
        <img
          :src="
            getPage.image
              ? getPage.image
              : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
          "
          class="card-img-top"
          :alt="getPage.slug"
        />
        <div class="card-body p-3">
          <h5 class="card-title">{{ getPage.name }}</h5>
          <p class="card-text">
            <span>@{{ getPage.slug }}</span>
            <span>{{ getPage.description }}</span>
            <span>{{ getPage.location }}</span>
            <span>{{ getPage.phone }}</span>
            <span>{{ getPage.mobile }}</span>
            <small class="text-muted"
              ><span class="text-dark">@{{ getPage.slug }}</span
              ><br /><span v-if="getPage.cityIdName">{{
                getPage.cityIdName
              }}</span
              ><span v-if="getPage.stateIdName"
                >, {{ getPage.stateIdName }}</span
              ><span v-if="getPage.stateIdName || getPage.stateIdName"> - </span
              ><span v-if="getPage.countryIdName">{{
                getPage.countryIdName
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
        <div class="tab-content mb-5" id="pills-tabContent">
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
          v-for="(item, index) in getPostsPerPage"
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
    this.fetchPostsPerPage(this.$route.params.id);
    this.fetchPage(this.$route.params.id);
  },
  methods: {
    ...mapActions(["fetchPage", "fetchPostsPerPage"]),
    async addComment() {},
    async addImage() {},
    async addVideo() {},
    async addPost() {
      const info = {
        content: this.form.title + " " + this.form.texto,
        image: "",
        video: await this.codeVideo(this.form.video),
        createdAt: String(Date.now()),
        status: "Público"
      };

      await axios
        .post(`${db}/pages/${this.$route.params.id}/posts`, info, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        })
        .then(async () => {
          this.form.title = "";
          this.form.texto = "";
          this.form.video = "";

          await this.fetchPostsPerPage(this.$route.params.id);
        })
        .catch(e => console.error(e));
    },
    async codeVideo(id) {
      let videoLink;
      const videoShort = await id.split("https://youtu.be/")[1];
      if (videoShort) {
        videoLink = videoShort;
      } else {
        const video = id.split("=")[1];
        videoLink = video.split("&")[0];
      }

      return videoLink;
    }
  },
  computed: {
    ...mapGetters(["getPage", "getPostsPerPage"])
  },
  watch: {
    $route: "fetchPage"
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
