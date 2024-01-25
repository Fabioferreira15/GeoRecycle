<template>
  <v-toolbar rounded color="#114B5F" id="nav">
    <!-- Links da esquerda -->
    <v-btn class="navlinks" @click="goToHeader('tittle3')">Reciclagem</v-btn>
    <v-btn class="navlinks" @click="goToHeader('tittle4')">Começar</v-btn>

    <!-- Logo -->
    <v-toolbar-title id="centro">
      <v-img
        v-if="isImageLoaded"
        :src="imageUrl"
        height="91px"
        width="91px"
      ></v-img>
    </v-toolbar-title>

    <!-- Links da direita -->
    <v-btn @click="$router.push('login')" class="navlinks" id="login">Login</v-btn>
    <v-btn @click="$router.push('registar')" class="navlinkRegistar" id="registar"
      >Registar</v-btn
    >
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      isImageLoaded: false,
      imageUrl: "src/assets/imgs/logo_nav.webp",
    };
  },
  methods: {
    goToHeader(headerId) {
      const header = document.getElementById(headerId);
      if (header) {
        header.scrollIntoView({ behavior: "smooth" });
      }
    },
    preloadImage(url) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.isImageLoaded = true;
      };
    },
  },
  mounted() {
    this.preloadImage(this.imageUrl);
  },
};
</script>

<style scoped>
#nav {
  color: #fdfcf8;
  font-family: "exo";
  font-weight: 700;
}

.navlinks:hover {
  color: #5582c9;
}
.navlinkRegistar {
  background-color: #5582c9;
  border-radius: 5px;
}

#centro {
  margin-left: 20%;
  margin-right: 20%;
}
</style>
