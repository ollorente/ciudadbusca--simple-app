<template>
  <div class="media mb-3">
    <router-link :to="{ name: 'Page', params: { id: page.slug } }">
      <img
        :src="
          page.image
            ? page.image
            : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
        "
        class="mr-3 img-avatar"
        alt="Usuario"
      />
    </router-link>
    <div class="media-body text-left small">
      <h5 class="m-0 h6 font-weight-bold">
        <router-link :to="{ name: 'Page', params: { id: page.slug } }">{{
          page.name
        }}</router-link>
      </h5>
      <p class="m-0">
        <router-link :to="{ name: 'Page', params: { id: page.slug } }"
          >@{{ page.slug }}</router-link
        >
      </p>
      <p class="m-0">{{ status }} | {{ createdAt }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "@/main";

export default {
  name: "OwnerPost",
  props: {
    dataPage: String,
    status: String,
    createdAt: Number
  },
  data() {
    return {
      page: "",
      pageSlug: this.$props.dataPage
    };
  },
  async mounted() {
    await this.getPage();
  },
  methods: {
    async getPage() {
      await axios
        .get(`${db}/pages/${this.pageSlug}/id`)
        .then(async response => {
          this.page = await response.data;
        })
        .catch(e => console.log(e));
    }
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
