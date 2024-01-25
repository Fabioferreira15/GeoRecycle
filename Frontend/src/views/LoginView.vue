<template>
  <div>
    <div class="left">
      <div class="left-content">
        <div class="left-content-text">
          <h1>Login</h1>
          <br />
          <input
            type="text"
            id="username"
            required
            placeholder="Utilizador"
            v-model="username"
          /><br />
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            v-model="password"
          /><br /><br />
          <v-btn text @click="login" id="botaoLogin">Login</v-btn><br /><br />
          <a @click="$router.push('/registar')"
            >Ainda não tem conta? Registe-se!</a
          >
        </div>
      </div>
      <div class="right">
        <div class="right-content">
          <img src="../assets/imgs/imgPagLogin.png" alt="" />
        </div>
      </div>
    </div>
    <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
    <v-snackbar ref= "snackbar2" v-model="snackbar2" :timeout="2000" color="success" >
      {{ snackbarMessage2 }}
    </v-snackbar>
    <v-snackbar ref="aguardando" v-model="aguardando" :timeout="10000" color="info">
      Aguarde, a processar...
    </v-snackbar>
  </div>
</template>

<script>
import { userStore } from "../stores/userStore.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      store: userStore(),
      snackbar: false,
      snackbarMessage: "",
      snackbar2: false,
      snackbarMessage2: "",
      aguardando: false,
    };
  },
  methods: {
    async login() {
      this.aguardando = true;
      try {
        await this.store.login({
          username: this.username,
          password: this.password,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Login efetuado com sucesso"
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
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
h1 {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #ffffff;
}

a {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}

.left {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  height: 100vh;
  width: 100vw;
}

.left-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left-content input {
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  padding-left: 20px;
}

.right {
  display: grid;
  background: white;
  grid-template-rows: 1fr;
  grid-gap: 10px;
}

.right-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-content img {
  width: 30%;
}

#botaoLogin {
  width: 100%;
  height: 50px;
  color: white;
  background: #114b5f;
  border: 1px solid #114b5f;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  padding-left: 20px;
}
</style>
