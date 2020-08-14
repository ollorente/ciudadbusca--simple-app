<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }" v-if="loggIn">Home | </router-link>
    <router-link :to="{ name: 'About' }">About | </router-link>
    <a href="#" @click="logout" v-if="loggIn">Logout</a>
    <router-link :to="{ name: 'Login' }" v-if="!loggIn">Login | </router-link>
    <router-link :to="{ name: 'Logup' }" v-if="!loggIn">Logup</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      loggIn: false
    };
  },
  created() {
    this.getAccess();
  },
  methods: {
    async logout() {
      await localStorage.clear("access_token");
      await this.$router.replace("/login");
    },
    async getAccess() {
      const token = await localStorage.getItem("access_token");

      if (token) {
        this.loggIn = true;
      }
    }
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
