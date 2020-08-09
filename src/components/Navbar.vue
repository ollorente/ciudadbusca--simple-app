<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {}
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
