<template>
  <div class="loja">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" cols="11">
          <h1 id="tituloLoja">Loja</h1>
        </v-col>
        <v-col>
          <p id="moedas">{{ moedas }}</p>
          <v-img
            id="moedaIcon"
            src="src/assets/imgs/imagensLoja/moedaIcon.webp"
            width="20px"
            heigth="20px"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="item in items" lg="3" md="4" xs="5">
          <v-card width="247px" height="290px" color="#114B5F" id="cardItem">
            <v-img
              :src="item.foto"
              width="247px"
              height="229px"
              class="white--text align-end"
            >
            </v-img>
            <v-card-text id="titulo">{{ item.nome }}</v-card-text>
            <v-card-text id="pontos">{{ item.preco }} </v-card-text>
            <v-card-actions>
              <v-btn
                icon="fa-solid fa-cart-shopping"
                id="btncomprar"
                @click="buyItem(item._id)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="2000" color="success">
      {{ snackbarMessage2 }}
    </v-snackbar>
    <v-snackbar
      ref="aguardando"
      v-model="aguardando"
      :timeout="10000"
      color="info"
    >
    Aguarde, a processar...
    </v-snackbar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { lojaStore } from "../stores/lojaStore.js";
import { userStore } from "../stores/userStore.js";
import jwtDecode from "jwt-decode";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      store: lojaStore(),
      userStore: userStore(),
      items: [],
      moedas: 0,
      userId: "",
      snackbar: false,
      snackbarMessage: "",
      snackbar2: false,
      snackbarMessage2: "",
      aguardando: false,
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
    async getUser(id) {
      try {
        const users = await this.userStore.getUserByID(id);
        this.moedas = users.moedas;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        const items = await this.store.getItemsUser();
        this.items = items;
        console.log(this.items[0]);
      } catch (error) {
        console.log(error);
      }
    },
    async buyItem(id) {
      this.aguardando = true;
      try {
        await this.store.buyItem(id);
        await this.getUser(this.userId);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Item comprado com successo";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
  },
  async mounted() {
    this.getUserId();
    await this.getUser(this.userId);
    await this.getItems();
  },
};
</script>

<style scoped>
.loja {
  background-image: url("../assets/imgs/Loja.jpg");
  height: 100vh;
  background-size: cover;
}

#tituloLoja {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
}
#cardItem {
  border-radius: 10px;
}
#titulo {
  font-family: "Exo";
  font-weight: bold;
  font-size: 15px;
  color: #fdfcf8;
  position: relative;
  top: 0px;
}
#pontos {
  font-family: "Exo";
  font-weight: regular;
  color: #fdfcf8;
  font-size: 15px;
  position: relative;
  top: -30px;
}

#btncomprar {
  position: relative;
  top: -105px;
  left: 190px;
  color: #fdfcf8;
}

#btncomprar:hover {
  color: #f0cd6e;
}
#moedas {
  font-family: "exo";
  color: #fdfcf8;
  font-weight: bold;
}
#moedaIcon {
  position: relative;
  top: -23px;
  left: 70px;
}
</style>
