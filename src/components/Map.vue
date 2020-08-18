<template>
  <div>
    <l-map
      id="mapid"
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          {{ name }}
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          {{ name }}
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  props: {
    lat: String,
    lon: String,
    name: String
  },
  data() {
    return {
      zoom: 16,
      center: latLng(this.$props.lat, this.$props.lon),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(this.$props.lat, this.$props.lon),
      withTooltip: latLng(this.$props.lat, this.$props.lon),
      currentZoom: 11.5,
      currentCenter: latLng(this.$props.lat, this.$props.lon),
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    }
  }
};
</script>

<style scoped>
#mapid {
  widows: 100%;
  height: 16rem;
}
</style>
.leaflet-tooltip.leaflet-clickable { cursor: pointer; pointer-events: auto; }

<style>
.leaflet-tooltip-left {
  margin-left: -6px;
}

.leaflet-tooltip {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  max-width: 300px;
}
</style>
