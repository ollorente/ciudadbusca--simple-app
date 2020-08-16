<template>
  <div class="my-pages">
    <div class="main">
      <Navbar />
      <h1 class="h3">My Pages</h1>
      <ul class="list-unstyled text-left">
        <router-link
          v-for="(item, index) in getPagesPerUser"
          :key="index"
          :to="{ name: 'Page', params: { id: item.slug } }"
        >
          <li class="media mb-4">
            <img
              :src="
                item.image
                  ? item.image
                  : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
              "
              class="mr-3 rounded img-avatar"
              :alt="item.name"
            />
            <div class="media-body">
              <h5 class="my-0 h6">
                <b>{{ item.name }}</b>
              </h5>
              <small class="text-muted"
                ><span class="text-dark">@{{ item.slug }}</span
                ><br /><span v-if="item.cityId.name">{{
                  item.cityId.name
                }}</span
                ><span v-if="item.stateId.name">, {{ item.stateId.name }}</span
                ><span v-if="item.stateId.name || item.stateId.name"> - </span
                ><span v-if="item.countryId.name">{{
                  item.countryId.name
                }}</span></small
              >
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Navbar from "@/components/Navbar";

export default {
  name: "MyPages",
  components: {
    Navbar
  },
  data() {
    return {
      myPages: [],
      me: ""
    };
  },
  mounted() {
    this.fetchPagesPerUser(this.getAuth.uid);
  },
  created() {
    this.auth();
    this.getProfile(this.getAuth);
  },
  methods: {
    ...mapActions(["auth", "fetchPagesPerUser"]),
    async getProfile(id) {
      this.me = await id.uid;
    }
  },
  computed: {
    ...mapGetters(["getAuth", "getPagesPerUser"])
  }
};
</script>

<style scoped>
.img-avatar {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  position: center center;
}
</style>
