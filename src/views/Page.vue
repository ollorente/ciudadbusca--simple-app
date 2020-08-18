<template>
  <div class="page">
    <div class="main">
      <Navbar />
      <Map
        v-if="getPage.geoLat && getPage.geoLon"
        :lat="getPage.geoLat"
        :lon="getPage.geoLon"
        :name="getPage.name"
      />
      <div class="card border-0 mb-4 text-left" v-if="show">
        <div class="media my-4">
          <img
            :src="
              getPage.image
                ? getPage.image
                : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
            "
            class="mr-3 avatar rounded-circle"
            :alt="getPage.slug"
          />
          <div class="media-body">
            <h5 class="mt-0 h6">
              <b>{{ getPage.name }}</b>
            </h5>
            <p>
              <span
                ><b>@{{ getPage.slug }}</b></span
              ><br />
              <small class="my-4">{{ getPage.description }}</small>
            </p>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-secondary btn-block"
          @click="button"
        >
          Carta de presentación
        </button>
      </div>

      <div class="card-body py-3 px-0 text-left" v-if="!show">
        <h5 class="h6 px-0 pt-3 mb-0">
          <span class="text-dark text-uppercase"><b>Presentación</b></span>
        </h5>
        <address class="card-body py-3 px-0">
          <p class="p-0 mx-0 my-2" v-if="getPage.location">
            <span class="small font-weight-bold">Dirección</span><br />
            <span>{{ getPage.location }}</span>
          </p>
          <p class="p-0 mx-0 my-2" v-if="getPage.phone">
            <span class="small font-weight-bold">Teléfono</span><br />
            <span>{{ getPage.phone }}</span>
          </p>
          <p class="p-0 mx-0 my-2" v-if="getPage.mobile">
            <span class="small font-weight-bold">Celular</span><br />
            <span>{{ getPage.mobile }}</span>
          </p>
          <p class="p-0 pt-3 mx-0 my-2 border-top">
            <span v-if="getPage.cityIdCode"
              ><router-link
                :to="{
                  name: 'UCity',
                  params: {
                    country: getPage.countryIdSlug,
                    state: getPage.stateIdCode,
                    city: getPage.cityIdCode
                  }
                }"
                role="button"
                >{{ getPage.cityIdName }}</router-link
              ></span
            ><span v-if="getPage.stateIdCode"
              >,
              <router-link
                :to="{
                  name: 'UState',
                  params: {
                    country: getPage.countryIdSlug,
                    state: getPage.stateIdCode
                  }
                }"
                role="button"
                >{{ getPage.stateIdName }}</router-link
              ></span
            ><br v-if="getPage.cityIdCode || getPage.stateIdCode" />
            <span v-if="getPage.countryIdName"
              ><router-link
                :to="{
                  name: 'UCountry',
                  params: { country: getPage.countryIdSlug }
                }"
                role="button"
                >{{ getPage.countryIdName }}</router-link
              ></span
            >
          </p>
        </address>
        <button
          type="button"
          class="btn btn-outline-secondary btn-block"
          @click="button"
        >
          Cancelar
        </button>
      </div>

      <div v-if="show" class="border-top pt-3">
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
        <div class="tab-content mb-5 border-bottom pb-3" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-comment"
            role="tabpanel"
            aria-labelledby="pills-comment-tab"
          >
            <form @submit.prevent="addComment">
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

        <div
          class="alert alert-light"
          role="alert"
          v-if="getPostsPerPage.length === 0"
        >
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

import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default {
  name: "Page",
  components: {
    Map,
    Navbar,
    Post
  },
  data() {
    return {
      form: {
        texto: null,
        video: null
      },
      page: "",
      posts: [],
      show: true
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
        content: this.form.texto,
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
    },
    async button() {
      this.show = !this.show;
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

.avatar {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
}
</style>
