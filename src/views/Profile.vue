<template>
  <div class="profile">
    <div class="main">
      <Navbar />
      <div class="card mb-3 text-left border-0">
        <div class="row no-gutters">
          <div class="col-md-3">
            <img
              :src="
                getAuth.photoURL
                  ? getAuth.photoURL
                  : `https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg`
              "
              class="card-img rounded-circle"
              :alt="getAuth.displayName"
            />
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">{{ getAuth.displayName }}</h5>
              <p class="card-text py-0 my-1" v-if="getAuth.email">
                <span class="font-weight-bold">Email: </span
                ><span>{{ getAuth.email }}</span>
              </p>
              <p class="card-text py-0 my-1" v-if="getAuth.phoneNumber">
                <span class="font-weight-bold">Phone: </span
                ><span>{{ getAuth.phoneNumber }}</span>
              </p>
              <p class="card-text py-0 my-1" v-if="getAuth.uid">
                <span class="font-weight-bold">UID: </span
                ><span>{{ getAuth.uid }}</span>
              </p>
              <p class="card-text">
                <small class="text-muted">{{ getAuth.createdAt }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Navbar from "@/components/Navbar";

export default {
  name: "Profile",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  created() {
    this.auth();
  },
  methods: {
    ...mapActions(["auth"])
  },
  computed: {
    ...mapGetters(["getAuth"])
  }
};
</script>

<style scoped>
.card-img {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
}
</style>
