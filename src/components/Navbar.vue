<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }" v-if="loggIn">Home | </router-link>
    <router-link :to="{ name: 'MyPages' }" v-if="loggIn"
      >My Pages |
    </router-link>
    <a href="#" @click="logout" v-if="loggIn">Logout</a>
    <router-link :to="{ name: 'Login' }" v-if="!loggIn">Login | </router-link>
    <router-link :to="{ name: 'Logup' }" v-if="!loggIn">Logup</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      loggIn: false
    };
  },
  mounted() {
    this.getAccess(this.getAuth.uid);
  },
  created() {
    this.auth();
  },
  methods: {
    ...mapActions(["auth"]),
    async logout() {
      await localStorage.clear("access_token");
      await this.$router.replace("/login");
    },
    async getAccess(id) {
      if (id) {
        this.loggIn = true;
      }
    }
  },
  computed: {
    ...mapGetters(["getAuth"])
  }
};
</script>

<style scoped>
#nav {
  padding: 0px;
  margin-bottom: 1.5rem;
}

#nav a {
  font-weight: bold;
  color: var(--dark);
}

#nav a.router-link-exact-active {
  color: var(--primary);
}
</style>
