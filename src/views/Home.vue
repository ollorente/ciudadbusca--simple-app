<template>
  <div class="home">
    <div class="main">
      <Navbar />
      <Publisher />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Publisher from "@/components/Publisher";

export default {
  name: "Home",
  components: {
    Navbar,
    Publisher
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
