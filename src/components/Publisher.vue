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
        <form @submit.prevent="addVideo">
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
      v-for="(item, index) in comments"
      :key="index"
      :title="item.title"
      :comment="item.comment"
      :image="item.image"
      :video="item.video"
      :createdAt="item.createdAt"
      :social="item.social"
      :status="item.status"
      :uid="item.uid"
    />
  </div>
</template>

<script>
import Post from "@/components/Post";

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
      comments: []
    };
  },
  methods: {
    async addComment() {
      if (this.form.title != null || this.form.texto != null) {
        const info = {
          title: this.form.title,
          comment: this.form.texto,
          image: this.form.image,
          video: this.form.video,
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: "AlFLDDdsm7MhbBRJv2mvObczRAp1"
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
          video: "",
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: "AlFLDDdsm7MhbBRJv2mvObczRAp1"
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
        let videoLink;
        const videoShort = this.form.video.split("https://youtu.be/")[1];
        if (videoShort) {
          videoLink = videoShort;
        } else {
          const video = this.form.video.split("=")[1];
          videoLink = video.split("&")[0];
        }

        const info = {
          title: this.form.title,
          comment: this.form.texto,
          image: "",
          video: videoLink,
          createdAt: String(Date.now()),
          social: "",
          status: "Público",
          uid: "AlFLDDdsm7MhbBRJv2mvObczRAp1"
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
    }
  }
};
</script>

<style scoped></style>
