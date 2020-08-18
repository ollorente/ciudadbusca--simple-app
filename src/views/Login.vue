<template>
  <div class="about">
    <div class="main">
      <Navbar />
      <div class="text-center">
        <form class="form-signin" @submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            v-model="form.email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          />

          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            v-model="form.password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
          />

          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "@/main";

import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: {
    Navbar
  },
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      loggIn: false,
      token: ""
    };
  },
  created() {
    this.getAccess();
  },
  methods: {
    async login() {
      const info = {
        email: this.form.email,
        password: this.form.password
      };

      await axios
        .post(`${auth}/login`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(async response => {
          await localStorage.setItem("access_token", response.data.jwt);
          await this.$router.replace("/my-pages");
        })
        .catch(e => console.log(e));
    },
    async getAccess() {
      const token = await localStorage.getItem("access_token");

      if (token) {
        this.loggIn = true;
        this.token = token;
      }
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
