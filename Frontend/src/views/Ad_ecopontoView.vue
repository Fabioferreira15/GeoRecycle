<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <h1>Adicionar ecoponto</h1>
    <v-container class="grey lighten-5">
      <div id="left">
        <div id="mapa">
          <Mapa />
        </div>
      </div>
      <div id="right">
        <span>
          Para adicionar um novo ecoponto, clique no mapa e de seguida carregue
          no botão de adicionar foto para colocar uma foto e assim registar um
          ecoponto. Para o ecoponto ficar totalmente validado, é preciso que
          três pessoas diferentes registem o mesmo ecoponto ou que um
          administrador valide as coordenadas. Só depois disso serão atribuídos
          os pontos correspondentes.
        </span>
        <br /><br /><br /><br /><br />
        <div id="morada">
          <v-text-field
            label="Morada"
            v-model="morada"
            :disabled="inputMoradaDisable"
          ></v-text-field>
        </div>
        <v-btn
          class="botaoAmarelo"
          @click="$refs.fileInput.click()"
          :disabled="btnAdicionarDisable"
          >Adicionar foto</v-btn
        ><br /><br />

        <form @submit="registarEcoponto">
          <input
            type="file"
            ref="fileInput"
            @change="uploadFile"
            style="display: none"
          />
          <v-btn
            class="botaoAmarelo"
            type="submit"
            id="btnRegistar"
            :disabled="btnRegistarDisable"
            >Confirmar</v-btn
          ><br /><br />
        </form>
      </div>
    </v-container>
    <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
    <v-snackbar
      ref="snackbar2"
      v-model="snackbar2"
      :timeout="2000"
      color="success"
    >
      {{ snackbarMessage2 }}
    </v-snackbar>
    <v-snackbar ref="aguardando" v-model="aguardando" :timeout="50000" color="info">
      Aguarde, a processar...
    </v-snackbar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Mapa from "@/components/Mapa.vue";
import { ecopontoStore } from "../stores/ecopontoStore.js";
import { userStore } from "../stores/userStore.js";
import { EcopontosService } from "../services/ecopontos.service";
import jwtDecode from "jwt-decode";

export default {
  components: {
    NavBar,
    Mapa,
  },
  data() {
    return {
      ecopontoStore: ecopontoStore(),
      userStore: userStore(),
      btnAdicionarDisable: true,
      btnRegistarDisable: true,
      fileInput: null,
      file: null,
      lat: null,
      lon: null,
      userId: "",
      ecopontoMap: localStorage.getItem("ecopontoMap"),
      snackbar2: false,
      snackbarMessage2: "",
      snackbar: false,
      snackbarMessage: "",
      aguardando: false,
      morada: "",
      inputMoradaDisable: true,
    };
  },
  watch: {
    morada(newValue, oldValue) {
      if (newValue != "") this.btnAdicionarDisable = false;
      else this.btnAdicionarDisable = true;
    },
  },
  methods: {
    getUserId() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;

      if (token) {
        const decoded = jwtDecode(token);
        this.userId = decoded.id;
      }
    },
    async uploadFile() {
      this.file = this.$refs.fileInput.files[0];
      this.btnRegistarDisable = false;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },

    async registarEcoponto(event) {
      event.preventDefault();
      this.aguardando = true;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("userId", this.userId);
      formData.append("morada", this.morada);
      formData.append("coordenadas[lat]", parseFloat(this.lat));
      formData.append("coordenadas[lon]", parseFloat(this.lon));
      try {
        await EcopontosService.adicionarEcoponto(formData);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Ecoponto adicionado com sucesso!";
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      } 
    },
  },
  mounted() {
    setInterval(() => {
      this.ecopontosMap = JSON.parse(localStorage.getItem("ecopontoMap"));
      if (this.ecopontosMap != null) {
        this.lat = this.ecopontosMap.lat;
        this.lon = this.ecopontosMap.lon;
        this.inputMoradaDisable = false;
      }
    }, 100);
    this.fileInput = this.$refs.fileInput;
    this.getUserId();
  },
};
</script>

<style scoped>
.home {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
}

#left {
  float: left;
  width: 50%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
}

#right {
  float: right;
  width: 50%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
}

.botaoAmarelo {
  background-color: #f0cd6e;
  color: white;
  width: 50%;
}

h1 {
  text-align: center;
  color: white;
  font-size: 40px;
  font-family: "Exo", sans-serif;
  font-weight: bold;
}

span {
  font-size: 23px;
  color: white;
  font-family: "Spinnaker", sans-serif;
  font-weight: regular;
}

#morada {
  width: 50%;
}
</style>
