<template class="custom-scrollbar">
  <div id="home">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" lg="4" class="col-ecopontos">
          <div class="title" align="center">
            <h1>Ecopontos</h1>
          </div>

          <br />
          <div class="custom-scrollbar" id="ecopontos" @scroll="showEcopontos">
            <br />
            <br />
            <div v-for="(ecoponto) in ecopontos" :key="ecoponto.id" class="ecoponto"
              @click="mostrarEcoponto(ecoponto._id)">
              <v-container>
                <v-row>
                  <v-col cols="2" id="ecoimg">
                    <v-img src="src/assets/imgs/ecoponto.webp" width="40px" height="40px"></v-img>
                  </v-col>
                  <v-col>
                    <p id="morada">{{ ecoponto.morada }}</p>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="8" class="col-mapa" align="center">
          <div>
            <Mapa />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn id="adicionarBtn" @click="$router.push('ad_ecoponto')">Adicionar novo ecoponto</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Mapa from "@/components/Mapa.vue";
import { ecopontoStore } from "../stores/ecopontoStore";

export default {
  components: {
    NavBar,
    Mapa,
  },
  data() {
    return {
      store: ecopontoStore(),
      index: 0,
      ecopontos: []
    };
  },
  async mounted() {
    await this.getEcopontos();
  },
  methods: {
    showEcopontos() {
      this.showEcopontos = true;
    },
    mostrarEcoponto(index) {
      this.$router.push("/ecoponto/" + index);
    },
    async getEcopontos() {
      try {
        await this.store.getEcopontos();
        this.ecopontos = this.store.getAllEcopontos;
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style scoped>
#home {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
}

.title {
  font-family: "Exo";
  color: #fdfcf8;
}

.col-mapa {
  max-width: 100%;
  max-height: 550px;
  overflow: hidden;
  position: relative;
  left: 20px
}

#ecopontos {
  height: 450px;
  overflow: scroll;
  cursor: pointer;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #F0CD6E;
}

.ecoponto {
  margin-bottom: 30px;
  position: relative;
  left: 20px;
  top: -20px;
  color: #fdfcf8;
  background-color: #114b5f;
  border-radius: 10px;
}

.ecoponto:hover {
  background-color: #0c3745;
  border-radius: 10px;
  color: #fdfcf8;
}

#morada {
  position: relative;
  top: 10px;
}

#adicionarBtn {
  position: relative;
  left: 20px;
  top: 20px;
  background-color: #F0CD6E;
  border-radius: 10px;
  color: #fdfcf8;
}

@media (max-width: 700px) {

  .col-ecopontos,
  .col-mapa {
    max-width: 100%;
  }
}
</style>
