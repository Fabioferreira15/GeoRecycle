<template>
  <GoogleMap api-key="AIzaSyBrCOmc3Yqq6DK8kBr2O66nt_yvsulC3hw" style="width: 100%; height: 500px" mapTypeId="hybrid"
    :center="center" :zoom="18" ref="map" :click="true" @click="clickMarcador">
    <Marker :options="currentPosMarkerOptions" />
    <Marker v-for="ecoponto in ecopontos" @click="focarEcoponto(ecoponto._id)" :key="ecoponto._id" :options="{
      position: {
        lat: ecoponto.coordenadas.lat,
        lng: ecoponto.coordenadas.lon,
      },
      icon: {
        url: '/src/assets/imgs/iconeEcoponto.png',
        scaledSize: { width: 29, height: 40 },
      },
    }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { ecopontoStore } from "../stores/ecopontoStore";

export default defineComponent({
  components: { GoogleMap, Marker },
  data() {
    return {
      //center: { lat: 41.36611, lng: -8.739542 },
      store: ecopontoStore(),
      ecopontos: [],
      center: { lat: 0, lng: 0 },
      currentPosMarkerOptions: {
        position: { lat: 0, lng: 0 },
        icon: {
          url: "/src/assets/imgs/locAtual2.png",
          scaledSize: { width: 29, height: 40 },
        },
        id: -1,
      },
      pagAtual: this.$route.name,
      jaAdicionado: false,
    };
  },
  created() {
    localStorage.removeItem("ecopontoMap");
    this.id = this.$route.params.id;
    if (!isNaN(this.id)) {
      this.center = {
        lat: this.store.getEcopontoById(this.id).coordenadas.lat,
        lng: this.store.getEcopontoById(this.id).coordenadas.lng,
      };
      this.verificarLoc();
    } else this.verificarLoc();
  },
  mounted() {
    this.getEcopontos();
  },
  methods: {
    async getEcopontos() {
      try {
        await this.store.getEcopontos();
        this.ecopontos = this.store.getAllEcopontos;
        //this.ecopontos = this.store.converterCoords(this.ecopontos)
        console.log(this.ecopontos);
      } catch (error) {
        console.log(error);
      }
    },
    focarEcoponto(id) {
      this.$router.push("/ecoponto/" + id);
      this.center = {
        lat: this.store.getEcopontoById(id).coordenadas.lat,
        lng: this.store.getEcopontoById(id).coordenadas.lng,
      };
    },
    verificarLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.currentPosMarkerOptions.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      } else {
        this.center = { lat: 41.36611, lng: -8.739542 };
        this.currentPosMarkerOptions.position = {
          lat: 41.36611,
          lng: -8.739542,
        };
      }
    },
    clickMarcador(event) {
      if (this.pagAtual == "ad_ecoponto") {
        if (this.jaAdicionado) {
          this.ecopontos.pop();
          localStorage.removeItem("ecopontoMap");
          this.jaAdicionado = false;
        }

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        const marker = new google.maps.Marker({
          coordenadas: { lat: lat, lng: lng },
          map: this.$refs.map,
        });

        this.ecopontos.push(marker);
        this.center = marker.coordenadas;

        //--------------------NÃO FUNCIONA ENQUANTO A API NÃO ESTIVER PAGA--------------------//
        /* const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: marker.coordenadas }).then((response) => {
          if (response.results[0]) {
            console.log(response.results[0].formatted_address);
            localStorage.setItem(
              "ecopontoMap",
              JSON.stringify(response.results[0].formatted_address)
            );
          } else {
            window.alert("No results found");
          }
        }).catch((e) => window.alert("Geocoder failed due to: " + e)); */

        const ecopontoMap = JSON.stringify({ lat: marker.coordenadas.lat, lon: marker.coordenadas.lng })
        localStorage.setItem("ecopontoMap", ecopontoMap);
        console.log(JSON.parse(ecopontoMap));
        this.jaAdicionado = true;
      }
    },
  },
});
</script>
