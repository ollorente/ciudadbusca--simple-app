<template>
  <div
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
    <div v-if="comment" class="comment mt-3">{{ comment }}</div>
    <div v-if="social" class="social">{{ social }}</div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    image: String,
    title: String,
    video: String,
    comment: String,
    createdAt: String,
    status: String,
    social: String,
    uid: String
  }
};
</script>

<style scoped>
.img-avatar {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  position: center center;
}
</style>
