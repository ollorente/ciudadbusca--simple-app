<template>
  <div class="media mb-3">
    <img
      src="https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png"
      class="mr-3 img-avatar"
      alt="Usuario"
    />
    <div class="media-body text-left small">
      <h5 class="m-0 h6 font-weight-bold">{{ dataPage.name }}</h5>
      <p class="m-0">@{{ dataPage.slug }}</p>
      <p class="m-0">{{ status }} | {{ createdAt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OwnerPost",
  props: {
    dataPage: Array,
    status: String,
    createdAt: Number
  }
};
</script>

<style scoped>
.img-avatar {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  position: center center;
}

.mr-3 {
  margin-right: 1rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
