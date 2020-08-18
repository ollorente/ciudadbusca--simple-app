<template>
  <div class="my-pages">
    <div class="main">
      <Navbar />
      <div class="card border-0 shadow-sm mb-4 text-left" v-if="!show">
        <div class="card-header text-center border-0 p-3 bg-white">
          <h1 class="card-title m-0 p-0 h3">Crear sitio</h1>
        </div>
        <div class="card-body py-3 px-0">
          <form @submit.prevent="addPage">
            <div class="form-group">
              <label for="name">Nombre del sitio *</label>
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                id="name"
                placeholder="Nombre del sitio"
                required
                autofocus
              />
            </div>
            <div class="form-group">
              <label for="slug">Link *</label>
              <input
                type="text"
                class="form-control"
                v-model="form.slug"
                id="slug"
                placeholder="link"
                required
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="geoLat">Latitud</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.geo.geoLat"
                  id="geoLat"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="geoLon">Longitud</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.geo.geoLon"
                  id="geoLon"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="image">Imagen</label>
              <input
                type="text"
                class="form-control"
                v-model="form.image"
                id="image"
                placeholder="Imagen"
              />
            </div>
            <div class="form-group">
              <label for="description">Descripción</label>
              <textarea
                class="form-control"
                v-model="form.description"
                id="description"
                rows="3"
                placeholder="Descripción"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="location">Dirección</label>
              <input
                type="text"
                class="form-control"
                v-model="form.location"
                id="location"
                placeholder="Dirección"
              />
            </div>
            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input
                type="text"
                class="form-control"
                v-model="form.phone"
                id="phone"
                placeholder="Teléfono"
              />
            </div>
            <div class="form-group">
              <label for="mobile">Celular</label>
              <input
                type="text"
                class="form-control"
                v-model="form.mobile"
                id="mobile"
                placeholder="Celular"
              />
            </div>
            <div class="form-group">
              <label for="countries">País *</label>
              <select
                class="form-control"
                v-model="form.country"
                id="countries"
                required
                @change="changedCountry()"
              >
                <option
                  v-for="(country, index) in getCountries"
                  :key="index"
                  :value="country.slug"
                  >{{ country.name }}</option
                >
              </select>
            </div>
            <div class="form-group">
              <label for="countries">Estado</label>
              <select
                class="form-control"
                v-model="form.state"
                id="states"
                @change="changedState()"
              >
                <option
                  v-for="(state, index) in getStatementsByCountry"
                  :key="index"
                  :value="state.code"
                  >{{ state.name }}</option
                >
              </select>
            </div>
            <div class="form-group">
              <label for="countries">Ciudad</label>
              <select class="form-control" v-model="form.city" id="city">
                <option
                  v-for="(city, index) in getCitiesByStatement"
                  :key="index"
                  :value="city.code"
                  >{{ city.name }}</option
                >
              </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block mb-3">
              Crear
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-block"
              @click="button"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>

      <h1 class="h3" v-if="show">My Pages</h1>
      <button
        type="button"
        class="btn btn-outline-primary btn-block mb-4"
        @click="button"
        v-if="show"
      >
        Agregar página
      </button>

      <ul class="list-unstyled text-left" v-if="show">
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
              class="mr-3 rounded img-avatar rounded-circle"
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
      form: {
        name: "",
        slug: "",
        userId: "",
        geo: {
          geoLat: "",
          geoLon: ""
        },
        image: "",
        description: "",
        location: "",
        phone: "",
        mobile: "",
        city: "",
        country: "",
        state: ""
      },
      myPages: [],
      me: "",
      show: true
    };
  },
  mounted() {
    this.fetchPagesPerUser(this.getAuth.uid);
  },
  created() {
    this.auth();
    this.getProfile(this.getAuth);
    this.fetchCountries();
  },
  methods: {
    ...mapActions([
      "auth",
      "newPage",
      "fetchCitiesByStatement",
      "fetchCountries",
      "fetchPagesPerUser",
      "fetchStatementsByCountry"
    ]),
    async getProfile(id) {
      this.me = await id.uid;
    },
    async button() {
      this.show = !this.show;
    },
    async addPage() {
      const info = {
        name: this.form.name,
        slug: this.form.slug,
        userId: this.getAuth.uid,
        geoLat: this.form.geo.geoLat,
        geoLon: this.form.geo.geoLon,
        image: this.form.image,
        description: this.form.description,
        location: this.form.location,
        phone: this.form.phone,
        mobile: this.form.mobile,
        countryId: this.form.country,
        stateId: this.form.state,
        cityId: this.form.city
      };

      await this.newPage(info);

      this.form.name = "";
      this.form.slug = "";
      this.userId = "";
      this.form.geo.geoLat = "";
      this.form.geo.geoLon = "";
      this.form.image = "";
      this.form.description = "";
      this.form.location = "";
      this.form.phone = "";
      this.form.mobile = "";
      this.form.country = "";
      this.form.state = "";
      this.form.city = "";

      this.show = !this.show;
      await this.fetchPagesPerUser(this.getAuth.uid);
    },
    async changedCountry() {
      const country = await this.form.country;
      await this.fetchStatementsByCountry(country);
    },
    async changedState() {
      const state = await this.form.state;
      await this.fetchCitiesByStatement(state);
    }
  },
  computed: {
    ...mapGetters([
      "getAuth",
      "getCitiesByStatement",
      "getCountries",
      "getPagesPerUser",
      "getStatementsByCountry"
    ])
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
