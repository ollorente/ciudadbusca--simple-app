<template>
  <div class="card">
    <div class="tag">{{ tag }} {{ createdAt }}</div>
    <h3 class="title">{{ title }}</h3>
    <img :src="image" :alt="title" class="img-post" />
    <div class="video">{{ video }}</div>
    <div class="comment">{{ comentario }}</div>
    <div class="social">{{ social }}</div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    tag: String,
    image: String,
    title: String,
    video: String,
    comentario: String,
    createdAt: String,
    social: String
  }
};
</script>

<style scoped>
.card {
  text-align: left;
  border-bottom: solid 1px var(--dark);
  padding: 1rem 0;
}

.card:nth-last-child(1) {
  border-bottom: 0;
}

.img-post {
  width: 100%;
  max-width: 100%;
  height: 162px;
  border-radius: 0.25rem;
  object-fit: cover;
  position: center center;
}
</style>
