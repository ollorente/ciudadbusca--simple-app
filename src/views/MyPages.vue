<template>
  <div class="my-pages">
    <div class="main">
      <Navbar />
      <h1 class="h3">My Pages</h1>
      <ul class="list-unstyled text-left">
        <router-link
          v-for="(item, index) in myPages"
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
import axios from "axios";
import { auth, db } from "@/main";

import Navbar from "@/components/Navbar";

export default {
  name: "MyPages",
  components: {
    Navbar
  },
  data() {
    return {
      myPages: [],
      profile: ""
    };
  },
  mounted() {
    this.getMyPages();
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getMyPages() {
      await this.getProfile();
      await axios
        .get(`${db}/users/${this.profile.uid}/pages`)
        .then(async response => {
          this.myPages = await response.data;
        })
        .catch(e => console.log(e));
    },
    async getProfile() {
      await axios
        .get(`${auth}/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
          }
        })
        .then(async response => {
          this.profile = {
            displayName: await response.data.displayName,
            email: await response.data.email,
            phoneNumber: await response.data.phoneNumber,
            photoURL: await response.data.photoURL,
            uid: await response.data.uid,
            createdAt: await response.data.createdAt,
            updatedAt: await response.data.updatedAt
          };
        })
        .catch(async e => {
          console.log(e.message);
          await localStorage.clear("access_token");
          await this.$router.replace("/login");
        });
    }
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
