<template>
  <div class="google-map" ref="googleMap"></div>
  <slot v-if="mapLoaded" :google="google" :map="map"/>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "GoogleMapLoader",

  props: {
    mapConfig: Object,
    apiKey: String
  },

  computed: {
    ...mapGetters(['mapLoaded'])
  },


  data() {
    return {
      google: null,
      map: null,
    }
  },

  async mounted() {
    // Wait for google maps script to load
    const googleMapsApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });

    this.google = googleMapsApi;

    // Initialize map
    this.initMap();
    this.addMapClickListener();
    if (this.map && this.google) this.setMapLoaded(true);
  },


  methods: {
    ...mapActions(['setMapLoaded']),

    initMap() {
      // set reference to map container
      const mapContainer = this.$refs.googleMap;

      // create new map
      this.map = new this.google.maps.Map(
          mapContainer, this.mapConfig
      );

      // log success
      console.info('Map initialized');
    }
    ,

    addMapClickListener () {

      // Configure the click listener.
      this.map.addListener("click", (mapsMouseEvent) => {
        if (!this.$store.getters.createEventEnabled) return;
        // Close the current InfoWindow.
        // Create a new InfoWindow.
        const pos = {
          latitude: mapsMouseEvent.latLng.lat(),
          longitude: mapsMouseEvent.latLng.lng(),
        }

        console.log(pos);
        this.$store.dispatch("setClickedPosition", pos);
      });
    }
  },

  unmounted() {
    this.map = null;
    this.google = null;
    this.setMapLoaded(false);
  }

}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 500px;
  background-color: azure;
}
</style>
