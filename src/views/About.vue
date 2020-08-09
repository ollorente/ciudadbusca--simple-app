<template>
  <div class="about">
    <div class="main">
      <Navbar />
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: {
    Navbar
  }
};
</script>

<style scoped></style>
