<template>
  <v-toolbar rounded color="#114B5F" id="nav" v-if="width > 900">
    <!-- Links da esquerda -->
    <v-btn
      v-for="link in leftLinks"
      :key="link.text"
      :to="link.route"
      :id="link.id"
    >
      {{ link.text }}
    </v-btn>
    <v-btn v-if="isAdmin()" @click="$router.push('/admin')">Menu Admin</v-btn>

    <!-- Logo -->
    <v-toolbar-title id="centro">
      <v-img
        src="src\assets\imgs\logo_nav.png"
        height="91px"
        width="91px"
      ></v-img>
    </v-toolbar-title>

    <!-- Links da direita -->
    <v-btn
      @click="$router.push('/perfil')"
      icon="fa-regular fa-user"
      id="perfil"
    ></v-btn>
    <v-btn
      @click="logout"
      icon="fa-solid fa-arrow-right-from-bracket"
      id="logout"
    ></v-btn>
  </v-toolbar>
  <v-toolbar
    rounded
    color="#114B5F"
    id="nav2"
    v-bind:class="{ expanded: expandNav }"
    v-else-if="width < 900"
  >
    <v-btn @click="expandNav = !expandNav">
      <v-icon>fa-solid fa-bars</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { userStore } from "../stores/userStore.js";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      store: userStore(),
      leftLinks: [
        { text: "Home", route: "/home", id: "home" },
        { text: "Rankings", route: "/rankings", id: "rankings" },
        { text: "Loja", route: "/loja", id: "loja" },
        { text: "Faq", route: "/faq", id: "faq" },
      ],
      width: window.innerWidth,
      height: window.innerHeight,
      expandNav: false,
      user: [],
    };
  },
  computed: {
    loggedInUser() {
      return this.store.getLoggedInUser;
    },
  },
  watch: {
    loggedInUser: {
      handler() {
        this.user = this.loggedInUser;
      },
      deep: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.store.getLoggedInUser().then((user) => (vm.user = user));
    });
  },
  mounted() {
    this.user = this.loggedInUser;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  },
  methods: {
    isAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.accessToken;
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.tipo === "admin";
      }
      return false;
    },
    logout() {
      try {
        this.store.logout();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#nav {
  color: #fdfcf8;
  font-family: "exo";
  font-weight: bold;
}

#centro {
  margin-left: 20%;
  margin-right: 20%;
}

#nav2 {
  transition: height 0.5s ease-in-out;
}

.expanded {
  height: 300px;
  z-index: 10;
  position: absolute;
  width: 100%;
}
</style>
