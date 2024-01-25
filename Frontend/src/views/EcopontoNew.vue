<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <div id="ecopontosInfo">
            <v-container>
              <v-row>
                <v-col>
                  <v-img :src="ecoponto.foto"></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <p>{{ ecoponto.morada }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <v-btn
                    id="botaoRegistar"
                    @click="$router.push('/registarEcoponto/' + ecoponto._id)"
                    >Registar</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <v-btn id="botaoVoltar" @click="$router.push('/home')"
                    >Voltar</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <div id="mapa">
            <Mapa />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Mapa from "@/components/Mapa.vue";
import { ecopontoStore } from "../stores/ecopontoStore.js";

export default {
  components: {
    NavBar,
    Mapa,
  },
  data() {
    return {
      id: this.$route.params.id,
      ecopontoStore: ecopontoStore(),
      ecoponto: [],
    };
  },
  methods: {
    async getEcopontoById(id) {
      try {
        const ecoponto = await this.ecopontoStore.getEcopontoById(id);
        this.ecoponto = ecoponto;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    await this.getEcopontoById(this.id);
    console.log(this.id);
  },
};
</script>

<style scopded>
.home {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
}

#ecopontosInfo {
  height: 500px;
  background-color: #114b5f;
  border-radius: 10px;
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
}

#botaoRegistar {
  background-color: #f0cd6e;
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  border-radius: 10px;
  width: 200px;
  height: 50px;
}
#botaoVoltar {
  background-color: #f0cd6e;
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  border-radius: 10px;
  width: 200px;
  height: 50px;
}
</style>
