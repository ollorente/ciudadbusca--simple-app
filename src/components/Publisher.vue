<template>
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
    <div class="tab-content mb-4" id="pills-tabContent">
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
            <input type="file" class="custom-file-input" id="image" lang="es" />
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
        <form @submit.prevent="addPost()">
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
      v-for="(item, index) in getPosts"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { db } from "@/main";

import Post from "@/components/Post";

const uuid = localStorage.getItem("access_token");

export default {
  name: "Publisher",
  components: {
    Post
  },
  data() {
    return {
      form: {
        texto: null,
        title: null,
        video: null
      },
      posts: []
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    async addComment() {
      if (this.form.title != null || this.form.texto != null) {
        const info = {
          title: this.form.title,
          comment: this.form.texto,
          image: this.form.image,
          video: await this.codeVideo(this.form.video),
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: uuid
        };
        await console.log(JSON.stringify(info));
        // eslint-disable-next-line no-undef
        $("#pills-comment").collapse({
          toggle: false
        });
        this.comments.push(info);

        this.form.title = "";
        this.form.texto = "";
        this.form.video = "";
      }
    },
    async addImage() {
      if (this.form.image != null) {
        const info = {
          title: this.form.title,
          comment: this.form.texto,
          image: this.form.image,
          video: await this.codeVideo(this.form.video),
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: uuid
        };

        await console.log(JSON.stringify(info));
        // eslint-disable-next-line no-undef
        $("#pills-image").collapse({
          toggle: false
        });
        this.comments.push(info);

        this.form.title = "";
        this.form.texto = "";
        this.form.video = "";
      }
    },
    async addVideo() {
      if (this.form.video != null) {
        const info = {
          title: this.form.title,
          comment: this.form.texto,
          image: "",
          video: this.codeVideo(this.form.video),
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: uuid
        };

        await console.log(JSON.stringify(info));
        // eslint-disable-next-line no-undef
        $("#pills-video").collapse({
          toggle: false
        });
        this.comments.push(info);

        this.form.title = "";
        this.form.texto = "";
        this.form.video = "";
      }
    },
    async addPost() {
      const info = {
        content: this.form.title + " " + this.form.texto,
        image: "",
        video: await this.codeVideo(this.form.video),
        createdAt: String(Date.now()),
        status: "Público"
      };
      console.log(info);
      await axios
        .post(`${db}/pages/${this.$route.params.id}/posts`, info, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + uuid
          }
        })
        .then(async response => {
          console.log(response.data);
          this.form.title = "";
          this.form.texto = "";
          this.form.video = "";

          await this.getPosts();
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
    ...mapGetters(["getPosts"])
  }
};
</script>

<style scoped></style>
