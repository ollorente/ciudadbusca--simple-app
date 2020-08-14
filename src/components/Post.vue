<template>
  <div class="post card border-0 shadow-sm mb-4">
    <!-- <div
      class="compartido px-3 py-2 border-bottom d-flex justify-content-between"
    >
      <Shared v-if="share" :share="share" />
      <span class="mt-0 h6" v-else></span>
      <a :href="`/${pageOwn.slug}/post/${id}`" role="button">
        <i class="fas fa-eye"></i>
      </a>
    </div> -->
    <OwnerPost :dataPage="page" :status="status" :createdAt="createdAt" />
    <img
      v-if="image"
      :src="
        image
          ? image
          : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
      "
      class="card-img-top"
      alt="photo"
    />
    <div class="embed-responsive embed-responsive-16by9" v-if="video">
      <iframe
        class="embed-responsive-item"
        :src="`https://www.youtube.com/embed/${video}?rel=0`"
        allowfullscreen
      ></iframe>
    </div>
    <div class="card-body py-3 px-0 text-left" v-if="content">
      {{ content }}
    </div>
    <div class="card-body p-3">
      <!-- <p class="card-text" v-if="comment">{{ comment }}</p> -->
      <div class="btn-group btn-block" role="group" aria-label="Basic example">
        <!-- <button
          class="btn btn-link"
          :class="color ? 'text-primary' : 'text-dark'"
          role="button"
          @click="like(user.uid)"
        >
          <i class="fas fa-heart"></i>
          {{ countLikes.length }}
        </button> -->
        <!-- <button class="btn btn-link text-dark" role="button" v-else>
          <i class="fas fa-heart"></i>
          {{ countLikes.length }}
        </button> -->
        <!-- <button class="btn btn-link text-dark" role="button">
          <i class="far fa-comments"></i> {{ comments.length }}
        </button> -->
        <div class="btn text-dark">
          <i class="far fa-eye"></i>
          {{ views }}
        </div>
      </div>
    </div>
    <div class="card-footer p-0">
      <!-- <Commentary :post="id" /> -->
    </div>
  </div>
  <!-- <div
    class="card mb-3 py-3 border-0 text-left"
    style="border-bottom: solid 1px var(--primary) !important;"
  >
    <div class="py-4">
      <div class="media">
        <img
          src="https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png"
          class="mr-3 img-avatar"
          alt="Usuario"
        />
        <div class="media-body">
          <h5 class="mt-0 h6 font-weight-bold">{{ uid }}</h5>
          {{ status }} | {{ createdAt }}
        </div>
      </div>
    </div>
    <h3 v-if="title" class="title h5">{{ title }}</h3>
    <img v-if="image" :src="image" :alt="title" class="img-post" />
    <div v-if="video" class="embed-responsive embed-responsive-16by9">
      <iframe
        class="embed-responsive-item"
        :src="`https://www.youtube.com/embed/${video}?rel=0`"
        allowfullscreen
      ></iframe>
    </div>
    <div v-if="content" class="comment mt-3">{{ content }}</div>
    <div v-if="social" class="social">{{ social }}</div>
    <pre class="container">{{ $props }}</pre>
  </div> -->
</template>

<script>
import axios from "axios";
import { db } from "@/main";

/* import Commentary from "@/components/Commentary";
import Shared from "@/components/Shared"; */
import OwnerPost from "@/components/OwnerPost";

export default {
  name: "Post",
  components: {
    /* Commentary,
    Shared */
    OwnerPost
  },
  props: {
    id: String,
    pageId: String,
    content: String,
    image: String,
    video: String,
    share: String,
    status: String,
    views: Number,
    createdAt: Number,
    isActive: Boolean,
    isLock: Boolean
  },
  data() {
    return {
      page: ""
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    async getPage() {
      await axios
        .get(`${db}/pages/${this.$props.pageId}/id`)
        .then(response => {
          this.page = response.data;
        })
        .catch(e => console.error(e));
    },
    async like(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
.img-avatar-boton {
  width: 2rem;
  height: 2rem;
}
</style>
