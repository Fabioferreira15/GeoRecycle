<template>
  <div class="landingpage">
    <v-container>
      <v-row>
        <v-col id="nav">
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 id="titulo1">Venha</h1>
          <h1 id="titulo2">Reciclar!</h1>
          <v-img id="img" src="src/assets/imgs/imagem1.webp"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <br /><br /><br /><br /><br /><br /><br />
    <v-container>
      <v-row class="my-8">
        <v-col cols="12">
          <h1 id="tittle3" align="center">O que é a Reciclagem?</h1>
        </v-col>
      </v-row>
      <v-row id="cards">
        <v-col cols="4" lg="4" id="reduzir">
          <v-card class="mx-auto" max-width="344" id="Card">
            <v-card-title>
              Reduzir
              <v-btn
                id="iconBtn"
                :icon="
                  showReduzir
                    ? 'fa-solid fa-arrow-up'
                    : 'fa-solid fa-arrow-down'
                "
                @click="showReduzir = !showReduzir"
              ></v-btn>
            </v-card-title>

            <v-expand-transition>
              <div v-show="showReduzir">
                <v-card-text>
                  Reduzir consiste em ações que reduzam o consumo de bens e
                  serviços, visando à diminuição da geração de resíduos e
                  consequente redução do desperdício.
                </v-card-text>
                <v-img src="src/assets/imgs/reduzir.webp" height="200px"></v-img>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="4" lg="4" id="reutilizar">
          <v-card class="mx-auto" max-width="344" id="Card">
            <v-card-title>
              Reutilizar
              <v-btn
                id="iconBtn"
                :icon="
                  showReutilizar
                    ? 'fa-solid fa-arrow-up'
                    : 'fa-solid fa-arrow-down'
                "
                @click="showReutilizar = !showReutilizar"
              ></v-btn
            ></v-card-title>

            <v-expand-transition>
              <div v-show="showReutilizar">
                <v-card-text>
                  A ação de reutilizar um produto é poder dar uma nova utilidade
                  para algo que, normalmente, iria ser deitado fora.
                </v-card-text>
                <v-img
                  src="src/assets/imgs/reutilizar.webp"
                  height="200px"
                ></v-img>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="4" lg="4" id="reciclar">
          <v-card class="mx-auto" max-width="344" id="Card">
            <v-card-title>
              Reciclar
              <v-btn
                id="iconBtn"
                :icon="
                  showReciclar
                    ? 'fa-solid fa-arrow-up'
                    : 'fa-solid fa-arrow-down'
                "
                @click="showReciclar = !showReciclar"
              ></v-btn>
            </v-card-title>

            <v-expand-transition>
              <div v-show="showReciclar">
                <v-card-text>
                  Promover uma reciclagem é a transformação de um produto que
                  não pode ser mais utilizado em um novo produto ou
                  matéria-prima.
                </v-card-text>
                <v-img
                  src="src/assets/imgs/reciclar.webp"
                  height="200px"
                ></v-img>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <v-container v-if="width > 1300">
      <v-row>
        <v-col cols="12">
          <div id="tittle4">
            <h1 align="center">Como Começar?</h1>
          </div>
        </v-col>
      </v-row>
      <v-row id="number1">
        <v-col cols="12" lg="8">
          <h1>Cria uma conta para começares o teu progresso</h1>
          <p>Vê todo o teu progresso no teu perfil.</p>
        </v-col>
        <v-col cols="12" lg="4">
          <v-img
            src="src/assets/imgs/img_perfil.webp"
            width="215px"
            height="239px"
          ></v-img>
        </v-col>
      </v-row>
      <v-row id="number2">
        <v-col cols="12" lg="4">
          <v-img
            src="src/assets/imgs/img_map.webp"
            width="240px"
            height="208px"
          ></v-img>
        </v-col>
        <v-col cols="12" lg="8">
          <h1>Abre o mapa e vê os ecopontos perto de ti</h1>
          <p>Seleciona o ecoponto para obteres o caminho até ele.</p>
        </v-col>
      </v-row>
      <v-row id="number3">
        <v-col cols="12" lg="8">
          <h1>Cria uma conta para começares o teu progresso</h1>
          <p>Vê todo o teu progresso no teu perfil.</p>
        </v-col>
        <v-col cols="12" lg="4">
          <v-img
            src="src/assets/imgs/img_moedas.webp"
            width="215px"
            height="239px"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex justify-center mb-6 bg-surface-variant">
            <v-btn
              id="registarbtn"
              variant="flat"
              @click="$router.push('registar')"
            >
              Registar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-img
        src="src/assets/imgs/Group15.webp"
        height="1703px"
        width="1090px"
        id="linhaimg"
      ></v-img>
    </v-container>
    <v-container v-else="width < 1300">
      <v-row>
        <v-col cols="12">
          <div id="tittle4">
            <h1 align="center">Como Começar?</h1>
          </div>
        </v-col>
      </v-row>
      <div class="numsDiv">
        <v-row class="my-8">
          <v-col cols="1">
            <h1 class="numeros" id="numero1">1</h1>
          </v-col>
          <v-col cols="11">
            <h1 class="text-h5">
              Cria uma conta para começares o teu progresso
            </h1>
            <p>Vê todo o teu progresso no teu perfil.</p>
          </v-col>
        </v-row>
        <v-row class="my-8">
          <v-col cols="1">
            <h1 class="numeros" id="numero2">2</h1>
          </v-col>
          <v-col cols="11">
            <h1 class="text-h5">Abre o mapa e vê os ecopontos perto de ti</h1>
            <p>Seleciona o ecoponto para obteres o caminho até ele.</p>
          </v-col>
        </v-row>
        <v-row class="my-8">
          <v-col cols="1">
            <h1 class="numeros" id="numero3">3</h1>
          </v-col>
          <v-col cols="11">
            <h1 class="text-h5">
              Cria uma conta para começares o teu progresso
            </h1>
            <p>Vê todo o teu progresso no teu perfil.</p>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <div id="footer">
      <v-container>
        <v-row>
          <v-col>
            <v-img
              src="src/assets/imgs/Logo.webp"
              width="300px"
              height="300px"
              id="logofooter"
            >
            </v-img>
          </v-col>
          <v-col id="contactos">
            <h2>Contactos</h2>
            <p><b>Email:</b> geral@esmad.ipp.pt</p>
            <br />
            <p>
              <b>Morada:</b> Rua D.Sancho I,nº981 <br />
              4480-876 Vila do Conde
            </p>
            <br />
            <p><b>Telefone:</b> +351 252 291 700</p>
          </v-col>
          <v-col>
            <v-btn icon="fa-solid fa-arrow-down" color="#F0CD6E" id="arrow" @click="goToTop"></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar-landing.vue";
import { userStore } from "../stores/userStore.js";
import { utilizacaoStore } from "../stores/utilizacaoStore.js";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      showReduzir: false,
      showReutilizar: false,
      showReciclar: false,
      width: window.innerWidth,
      height: window.innerHeight,
      userStore: userStore(),
      utilizacaoStore: utilizacaoStore(),
    };
  },
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      console.log(this.width, this.height);
    });
  },
};
</script>

<style scoped>
.landingpage {
  background-image: url("../assets/imgs/background-landing.png");
  background-size: cover;
  height: 4490px;
}

#tittle3 {
  font-family: "exo";
  color: #fdfcf8;
  font-size: 50px;
  font-weight: bold;
}

#Card {
  background-color: #093427;
  color: #fdfcf8;
  font-family: "Exo";
  border-radius: 10px;
}

#iconBtn {
  background-color: transparent;
  color: #fdfcf8;
  position: relative;
  left: 190px;
  box-shadow: none;
  text-shadow: none;
}

#tittle4 h1 {
  font-family: "exo";
  color: #fdfcf8;
  font-size: 50px;
  font-weight: bold;
}

#number1 {
  position: relative;
  top: 100px;
  left: 70px;
  color: #fdfcf8;
  font-family: "Exo";
  font-style: Bold;
}

#number2 {
  position: relative;
  top: 550px;
  left: -70px;
  color: #fdfcf8;
  font-family: "Exo";
  font-style: Bold;
}

#number3 {
  position: relative;
  top: 1100px;
  left: 120px;
  color: #fdfcf8;
  font-family: "Exo";
  font-style: Bold;
}

#linhaimg {
  position: relative;
  top: -750px;
  left: 0px;
}

.numsDiv {
  position: relative;
  top: 50px;
}

.numeros {
  color: #114b5f;
  font-family: "Exo";
  font-style: Bold;
  font-size: 48px;
}

h1 {
  color: #fdfcf8;
  font-family: "Exo";
  font-style: Bold;
}

p {
  color: #fdfcf8;
  font-family: "Exo";
  font-style: normal;
}

#registarbtn {
  position: relative;
  top: 1200px;
  height: 49px;
  background-color: #114b5f;
  color: #fdfcf8;
  font-family: "Exo";
  font-style: Bold;
}
#footer {
  background-image: url("../assets/imgs/footer.svg");
  background-size: cover;
  height: 400px;
  position: relative;
  top: 60px;
}
#logofooter {
  position: relative;
  top: 50px;
}

#contactos {
  position: relative;
  top: 90px;
  left: 90px;
  color: #fdfcf8;
}

#arrow {
  transition: transform 0.5s ease;
  box-shadow: none;
  text-shadow: none;
  color: #114b5f;
  position: relative;
  top: 300px;
  left: 450px;
}

#arrow:hover {
  transform: rotate(180deg);
}

@media (max-width: 600px) {
  #tittle3,
  #tittle4 h1 {
    font-size: 30px;
  }

  h1 {
    color: #fdfcf8;
    font-family: "Exo";
    font-style: Bold;
    font-size: 20px;
  }

  p {
    color: #fdfcf8;
    font-family: "Exo";
    font-style: normal;
    font-size: 15px;
  }

  #img {
    position: relative;
    width: 194.39px;
    height: 140.52px;
    object-fit: contain;
    left: 130px;
  }

  #titulo1 {
    font-family: "exo";
    font-size: 25px;
    color: #fdfcf8;
    position: absolute;
    left: 20px;
    top: 170px;
  }

  #titulo2 {
    position: absolute;
    font-family: "Exo";
    font-style: Bold;
    font-size: 40px;
    color: #114b5f;
    z-index: 1;
    left: 20px;
    top: 200px;
  }
}

@media (min-width: 601px) and (max-width: 768px) {
  #img {
    position: relative;
    width: 369.53px;
    height: 267.13px;
    object-fit: contain;
    left: 300px;
  }

  #titulo1 {
    font-family: "exo";
    font-size: 50px;
    color: #fdfcf8;
    position: absolute;
    left: 100px;
    top: 200px;
  }

  #titulo2 {
    position: absolute;
    font-family: "Exo";
    font-style: Bold;
    font-size: 90px;
    color: #114b5f;
    z-index: 1;
    left: 100px;
    top: 250px;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  #img {
    position: relative;
    width: 369.53px;
    height: 267.13px;
    object-fit: contain;
    left: 300px;
  }

  #titulo1 {
    font-family: "exo";
    font-size: 50px;
    color: #fdfcf8;
    position: absolute;
    left: 100px;
    top: 200px;
  }

  #titulo2 {
    position: absolute;
    font-family: "Exo";
    font-style: Bold;
    font-size: 90px;
    color: #114b5f;
    z-index: 1;
    left: 100px;
    top: 250px;
  }
}

@media (min-width: 992px) {
  #img {
    position: relative;
    width: 478.34px;
    height: 345.78px;
    object-fit: contain;
    left: 500px;
  }

  #titulo1 {
    font-family: "exo";
    font-size: 70px;
    color: #fdfcf8;
    position: absolute;
    left: 180px;
    top: 200px;
  }

  #titulo2 {
    position: absolute;
    font-family: "Exo";
    font-style: Bold;
    font-size: 100px;
    color: #114b5f;
    z-index: 1;
    left: 180px;
    top: 300px;
  }
}

@media (min-width: 1200px) {
  #img {
    position: relative;
    width: 720.73px;
    height: 521px;
    object-fit: contain;
    top: 50px;
    left: 500px;
  }

  #titulo1 {
    font-family: "exo";
    font-size: 90px;
    color: #fdfcf8;
    position: absolute;
    left: 180px;
    top: 200px;
  }

  #titulo2 {
    position: absolute;
    font-family: "Exo";
    font-style: Bold;
    font-size: 140px;
    color: #114b5f;
    left: 180px;
    top: 300px;
    z-index: 1;
  }
}
</style>