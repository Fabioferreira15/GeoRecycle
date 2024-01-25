<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <br /><br /><br /><br /><br />
    <div id="container">
      <v-container id="containerAzul">
        <span id="voltar" @click="$router.go(-1)"><b>X</b></span>
        <h1 align="center" id="titulo">Registar utilização do ecoponto</h1>
        <br /><br />
        <img
          v-if="!fotoPreview"
          src="../assets/imgs/adFoto.png"
          id="adFoto"
          @click="$refs.fileInput.click()"
        />
        <img v-else :src="fotoPreview" id="previewImage" @click="$refs.fileInput.click()" />
        <form @submit="registarUtilizacao">
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="uploadFile"
          />
          <v-btn type="submit" style="background-color: #f0cd6e">Registar</v-btn>
        </form>

        <br />
        
      </v-container>
    </div>
    <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
    <v-snackbar ref= "snackbar2" v-model="snackbar2" :timeout="2000" color="success" >
      {{ snackbarMessage2 }}
    </v-snackbar>
    <v-snackbar ref="aguardando" v-model="aguardando" :timeout="50000" color="info">
      Aguarde, a processar...
    </v-snackbar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { userStore } from "../stores/userStore.js";
import { utilizacaoStore } from "../stores/utilizacaoStore.js";
import { UtilizacoesService } from "../services/utilizacoes.service";
import jwtDecode from "jwt-decode";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userStore: userStore(),
      utilizacaoStore: utilizacaoStore(),
      ecoponto: this.$route.params.id,
      userAtual: "",
      file: null,
      fileInput: null,
      userId: "",
      fotoPreview: null,
      snackbar: false,
      snackbarMessage: "",
      snackbar2: false,
      snackbarMessage2: "",
      aguardando: false,
    };
  },
  async mounted() {
    this.getUserId();
    console.log(this.userId);
    this.fileInput = this.$refs.fileInput;
    console.log(this.fileInput);
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

      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    async registarUtilizacao(event){
      event.preventDefault();
      this.aguardando = true;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("idUser", this.userId);
      try{
        await UtilizacoesService.registarUtilizacao(this.ecoponto,formData);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Utilização registada com sucesso"
        setTimeout(() => {
          this.$router.push("/home");
        }, 2000);
      } catch (error){
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }

    },
  },
};
</script>
<style scoped>
.home {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
}

#containerAzul {
  background-color: #114b5f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#container {
  display: block;
  margin: auto;
}

#adFoto {
  border-radius: 10px;
  width: 60%;
  height: 60%;
}

#voltar {
  color: white;
  font-size: 30px;
  cursor: pointer;
  align-self: flex-end;
  margin-right: 20px;
}
#titulo {
  color: #fdfcf8;
  font-family: "exo";
  font-weight: bold;
}
</style>
