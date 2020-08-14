<template>
  <div class="error">
    <div class="main">
      <Navbar />
      <h1>This is an error page</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Error",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
