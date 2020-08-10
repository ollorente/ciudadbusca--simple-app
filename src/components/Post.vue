<template>
  <div
    class="card mb-3 py-3 border-0 text-left"
    style="border-bottom: solid 1px var(--primary) !important;"
  >
    <div v-if="createdAt" class="created-at text-right">{{ createdAt }}</div>
    <div v-if="uid" class="user">{{ uid }}</div>
    <h3 v-if="title" class="title">{{ title }}</h3>
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
    social: String,
    uid: String
  }
};
</script>

<style scoped></style>
