<template>
  <div class="home">
    <div class="main">
      <Navbar />
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

      <Post
        v-for="(item, index) in comments"
        :key="index"
        :tag="item.tag"
        :title="item.title"
        :comment="item.comment"
        :image="item.image"
        :video="item.video"
        :createdAt="item.createdAt"
        :social="item.social"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default {
  name: "Home",
  components: {
    Navbar,
    Post
  },
  data() {
    return {
      form: {
        texto: "",
        title: ""
      },
      comments: []
    };
  },
  methods: {
    async addComment() {
      const info = {
        tag: "algo",
        title: this.form.title,
        comment: this.form.texto,
        image: "http://192.168.0.4:8080/img/aros3.14651ee1.png",
        video: "video 1",
        createdAt: String(Date.now()),
        social: "sdfghj"
      };
      await console.log(JSON.stringify(info));
      this.comments.push(info);

      this.form.title = "";
      this.form.texto = "";
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  padding: 0;
  margin: 0rem auto 2rem;
}

.form-group {
  margin-bottom: 0.5rem;
}

textarea {
  overflow: auto;
  resize: vertical;
}

.form-control {
  display: block;
  width: calc(100% - 1.75rem);
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--dark);
  background-color: var(--light);
  background-clip: padding-box;
  border: 1px solid var(--primary);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

textarea.form-control {
  height: auto;
  width: calc(100% - 1.75rem);
  border: solid 1px var(--primary);
}
</style>
