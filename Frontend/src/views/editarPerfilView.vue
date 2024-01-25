<template>
  <div class="editarPerfil" align="center">
  <v-container>
    <v-row>
      <v-col>
        <NavBar />
      </v-col>
    </v-row>
  </v-container>

    <div class="blue-background">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" id="textfields">
            <v-text-field
              label="Biografia"
              v-model="biografia"
              multi-line
            ></v-text-field>
            <v-text-field
              label="Nova Senha"
              v-model="novaSenha"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Confirmar nova senha"
              v-model="confirmarSenha"
              type="password"
            ></v-text-field>
            <v-btn
              color="primary"
              @click="updateUser()"
            >
              Alterar dados
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <div class="fotoperfil">
              <v-img 
              v-if="!fotoPreview"
              :src="user.foto"
              id="avatar"
              width="200px"
              height="200px"
            ></v-img>
            <v-img 
              v-else
              :src="fotoPreview"
              id="avatar"
              width="200px"
              height="200px"
            ></v-img>
            </div>
            <v-btn color="primary" @click="$refs.fileInput.click()">
              Escolher imagem
            </v-btn>
            <form @submit="updateUserImage">
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="uploadFile"
              />
              <v-btn color="primary" type="submit" :disabled="btnDisable">
                Alterar imagem
              </v-btn>
            </form>
          </v-col>
  
        </v-row>
      </v-container>
      <input type="file" accept="image/*" ref="foto" style="display: none" />
    </div>
  </div>
  <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
    {{ snackbarMessage }}
  </v-snackbar>
  <v-snackbar
    ref="snackbar2"
    v-model="snackbar2"
    :timeout="2000"
    color="success"
    @input="handleSnackbarClose"
  >
    {{ snackbarMessage2 }}
  </v-snackbar>
  <v-snackbar ref="aguardando" v-model="aguardando" :timeout="50000" color="info">
    Aguarde, a processar...
    </v-snackbar>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { userStore } from "../stores/userStore.js";
import { UserService } from "../services/user.service";
import jwtDecode from "jwt-decode";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      store: userStore(),
      user:[],
      biografia: "",
      novaSenha: "",
      confirmarSenha: "",
      color: "primary",
      userId: "",
      snackbar: false,
      snackbarMessage: "",
      snackbar2: false,
      snackbarMessage2: "",
      aguardando: false,
      fotoPreview:null,
      file:null,
      fileInput:null,
      btnDisable:true,
    };
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

    async uploadFile(){
      this.file = this.$refs.fileInput.files[0];
      this.btnDisable = false;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    async getUser(id) {
      try {
        const users = await this.store.getUserByID(id);
        this.user = users;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser() {
      this.aguardando = true;
      try {
        await this.store.editUser(this.userId, {
          biografia: this.biografia,
          password: this.novaSenha,
          confirmPassword: this.confirmarSenha,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Dados alterados com sucesso!";
        setTimeout(() => {
          this.$router.push("/perfil");
        }, 2000);
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
    async updateUserImage(event){
      this.aguardando = true;
      event.preventDefault()
      const formData = new FormData();
      formData.append('image',this.file);
      try{
        await UserService.updateUserPhotoById(this.userId,formData);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Imagem alterada com sucesso!";
      } catch(error){
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
    alterarImagem() {
      this.$refs.foto.click();
      this.$refs.foto.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.filePath = e.target.result;
          console.log(this.filePath);
        };
      };
    },
  },
  async mounted() {
    this.getUserId();
    await this.getUser(this.userId);
    this.fileInput = this.$refs.fileInput;
  },
};
</script>

<style>
.editarPerfil {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
  font-family: "exo";
}

.blue-background {
  background-color: #114b5f;
  border-radius: 10px;
  width: 80%;
}

#alterarDados {
  background-color: #f0cd6e;
  color: #fdfcf8;
  font-family: "exo";
}

#textfields {
  color: #f0cd6e;
  font-family: "exo";
}
</style>
