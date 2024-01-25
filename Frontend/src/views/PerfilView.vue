 <template>
  <div class="perfil">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <v-container id="informacoes" v-if="width > 1000">
      <div class="responsive-background-image">
        <v-row>
          <v-col cols="1" align="center">
            <v-img
              :src="user.foto"
              id="avatar"
              width="83px"
              height="90px"
            ></v-img>
          </v-col>
          <v-col cols="2" id="perfilInfo">
            <p class="user-name">{{ user.nome }}</p>
            <p class="user-level">Nível: {{ user.nivel }}</p>
            <v-progress-linear
              v-model="progresso"
              max="100"
              id="progresso"
              class="perfil-info"
            ></v-progress-linear>
          </v-col>
          <v-col cols="2" align="center">
            <p id="info">
              Ecopontos Registados <br />{{ user.ecopontosRegistados }}
            </p>
          </v-col>
          <v-col cols="2" align="center">
            <p id="info">
              Ecopontos Utilizados <br />{{ user.numUsoEcopontos }}
            </p>
          </v-col>
          <v-col cols="2" align="center">
            <p id="info">Moedas <br />{{ user.moedas }}</p>
          </v-col>
        </v-row>
        <v-row class="my-4">
          <v-col cols="9" id="biografia">
            <h3>Biografia</h3>
            <p>{{ user.biografia }}</p>
          </v-col>
        </v-row>
        <v-row class="my-10">
          <v-col cols="3">
            <v-btn @click="$router.push('editarPerfil')" id="editar"
              >Editar perfil</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container v-else="width < 999">
      <div id="backgorunSmaller">
        <v-container>
          <v-row>
            <v-col align="center">
              <v-img
                src="/src/assets/imgs/avatar2.png"
                id="avatarSmaller"
                width="40px"
                height="40px"
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <p class="user-name">{{ user.nome }}</p>
              <p>Nivel: {{ user.nivel }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-progress-linear
                v-model="progresso"
                max="100"
                width="10px"
                id="progresso-smaller"
                class="perfil-info"
              ></v-progress-linear>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <p id="infoSmaller">Biografia</p>
              <p id="infoSmallerP">{{ user.biografia }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <p id="infoSmaller">
                Ecopontos Registados <br />{{ user.ecopontosRegistados }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <p id="infoSmaller">
                Ecopontos Utilizados <br />{{ user.numUsoEcopontos }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <p id="infoSmaller">Moedas <br />{{ user.moedas }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="$router.push('editarPerfil')" id="editarSmall"
                >Editar perfil</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <v-container>
      <div id="blobdiv" align="center">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg"
          style="opacity: 1"
          filter="blur(0px)"
          transform="rotate(54)"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: rgb(21, 121, 91)"></stop>
              <stop offset="100%" style="stop-color: rgb(21, 121, 91)"></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)" style="opacity: 1">
            <animate
              attributeName="d"
              dur="19.7s"
              repeatCount="indefinite"
              values="M463.5,311.5Q441,373,396,422Q351,471,287,455Q223,439,179,411Q135,383,79,350Q23,317,51.5,258.5Q80,200,94,143.5Q108,87,162,49.5Q216,12,281.5,24.5Q347,37,383.5,89Q420,141,453,195.5Q486,250,463.5,311.5Z;M440.79254,295.90011Q393.21514,341.80021,357.53347,375.20746Q321.85181,408.61471,271.82218,427.01866Q221.79254,445.4226,171.55544,422.09659Q121.31834,398.77057,68.79254,358.84083Q16.26674,318.91109,38.15202,256.60373Q60.03731,194.29637,79.65586,134.88912Q99.27441,75.48187,157.19648,42.12622Q215.11855,8.77057,268.67782,50.11855Q322.2371,91.46653,362.16684,121.87761Q402.09659,152.2887,445.23326,201.14435Q488.36994,250,440.79254,295.90011Z;M415.01911,310.8863Q439.5452,371.7726,388.0904,405.2945Q336.6356,438.8164,280.7726,433.452Q224.9096,428.08761,185.95759,398.74511Q147.00559,369.40261,129.05219,330.15471Q111.09878,290.9068,102.89189,247.863Q94.68499,204.8192,97.4315,140.3164Q100.17801,75.81361,160.4068,60.51771Q220.6356,45.22181,275.226,60.1356Q329.8164,75.04939,372.9534,109.3658Q416.0904,143.6822,403.29171,196.8411Q390.49301,250,415.01911,310.8863Z;M456.0768,303.76136Q418.13543,357.52271,379.98225,404.29316Q341.82907,451.0636,284.01817,433.65772Q226.20727,416.25185,163.99091,418.54046Q101.77456,420.82907,62.72047,368.86953Q23.66638,316.90999,61.99091,261.65772Q100.31545,206.40545,118.97771,163.62635Q137.63998,120.84725,179.51817,86.26136Q221.39637,51.67547,267.19818,81.83773Q313,112,367.68455,125.86045Q422.36911,139.7209,458.19364,194.86045Q494.01817,250,456.0768,303.76136Z;M394.89432,291.86359Q379.96349,333.72718,354.5999,379.04899Q329.23631,424.37079,274.96542,439.22911Q220.69452,454.08742,185.59462,409.0927Q150.49472,364.09798,125.7075,328.96349Q100.92028,293.82901,59.42363,237.80355Q17.92698,181.77809,66.30163,137.5999Q114.67627,93.42171,168.36359,75.4145Q222.05091,57.4073,282.76369,51.5999Q343.47647,45.7925,374.93276,97.57444Q406.38905,149.35639,408.1071,199.67819Q409.82516,250,394.89432,291.86359Z;M432.03478,297.56957Q398.46218,345.13914,356.36479,367.83696Q314.26739,390.53478,267.26739,423.085Q220.26739,455.63521,175.78826,421.28282Q131.30913,386.93043,88.83152,348.48609Q46.35391,310.04174,68.21174,256.28131Q90.06957,202.52087,95.17544,139.65457Q100.28131,76.78826,162.38717,74.23956Q224.49304,71.69087,270.52087,88.04326Q316.5487,104.39565,381.35239,113.97913Q446.15608,123.56261,455.88173,186.78131Q465.60739,250,432.03478,297.56957Z;M463.5,311.5Q441,373,396,422Q351,471,287,455Q223,439,179,411Q135,383,79,350Q23,317,51.5,258.5Q80,200,94,143.5Q108,87,162,49.5Q216,12,281.5,24.5Q347,37,383.5,89Q420,141,453,195.5Q486,250,463.5,311.5Z"
            ></animate>
          </path>
        </svg>
      </div>

      <v-row>
        <v-col class="d-flex justify-center mb-6 bg-surface-variant">
          <h1 id="titleRef">Referral Code</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center mb-6 bg-surface-variant">
          <p id="expRef">
            Compartilhe o referral code abaixo com os seus amigos e ganhem ambos
            moedas virtuais para poderem usar na nossa loja.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="width > 1500">
      <v-img
        src="src\assets\imgs\linha_referral.svg"
        width="422.57px"
        heigth="376.5px"
        id="linha"
      ></v-img>
    </div>

    <v-container>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4" class="d-flex justify-center mb-6 bg-surface-variant">
          <v-card :text="referral" id="refCard"></v-card>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
    </v-container>
    <br />
    <br />
    <br />
    <v-container v-if="noUtilizacoes">
      <v-row>
        <v-col class="d-flex justify-center mb-6 bg-surface-variant">
          <h1 id="titleBadge">As minhas utilizações</h1>
        </v-col>
      </v-row>
      <h2>{{ noUtilizacoesMsg }}</h2>
    </v-container>
    <v-container v-else="!noUtilizacoes">
      <v-row>
        <v-col>
          <h1 align="center" id="titulo">As minhas utilizações</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-carousel
            show-arrows="hover"
            prev-icon="fa-solid fa-arrow-left"
            next-icon="fa-solid fa-arrow-right"
          >
            <v-carousel-item
              v-for="utilizacao in utilizacoes"
              :src="utilizacao.foto"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="noBadges">
      <v-row>
        <v-col class="d-flex justify-center mb-6 bg-surface-variant">
          <h1 id="titleBadge">As minhas Badges</h1>
        </v-col>
      </v-row>
      <h2>{{ noBadgesMsg }}</h2>
    </v-container>
    <v-container v-else="!noBadges">
      <v-row>
        <v-col class="d-flex justify-center mb-6 bg-surface-variant">
          <h1 id="titleBadge">As minhas Badges</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-carousel
            show-arrows="hover"
            prev-icon="fa-solid fa-arrow-left"
            next-icon="fa-solid fa-arrow-right"
          >
            <v-carousel-item
              v-for="badge in badges"
              :src="badge"
              style="max-height: 200px; max-width: 200px"
            >
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { userStore } from "../stores/userStore.js";
import { utilizacaoStore } from "../stores/utilizacaoStore.js";
import jwtDecode from "jwt-decode";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      store: userStore(),
      utilizacaoStore: utilizacaoStore(),
      user: [],
      userId: "",
      width: window.innerWidth,
      height: window.innerHeight,
      length: 3,
      window: 0,
      progresso: 0,
      referral: "",
      badges: [],
      noBadges: false,
      noBadgesMsg:"",
      noUtilizacoes: false,
      noUtilizacoesMsg: "",
      utilizacoes: [],
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
        const users = await this.store.getUserByID(id);
        this.user = users;
      } catch (error) {
        console.log(error);
      }
    },
    async getBadgesUser(id) {
      try {
        const badges = await this.store.getBadgesUser(id);
        this.badges = badges;
      } catch (error) {
        this.noBadges = true;
        this.noBadgesMsg = error
      }
    },
    async getUtilizacoesUser(id){
      try{
        const utilizacoes = await this.store.getUtilizacoesUser(id);
        this.utilizacoes = utilizacoes;
      } catch (error) {
        this.noUtilizacoes = true;
        this.noUtilizacoesMsg = error
      }
    }
  },

  async mounted() {
    this.getUserId();
    await this.getBadgesUser(this.userId);
    await this.getUtilizacoesUser(this.userId);
    await this.getUser(this.userId);
    this.referral = this.user.referral;
  },

  created() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      console.log(this.width, this.height);
    });
    //console.log(this.user);
  },
};
</script>

<style scoped>
.perfil {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  min-height: 1080px;
  z-index: -1;
}
.responsive-background-image {
  background-image: url("../assets/imgs/fundo_div_perfil.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  height: 300px;
}
#backgorunSmaller {
  background-image: url("src/assets/imgs/fundo_div_perfil.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  height: 500px;
  z-index: 2;
  color: #fdfcf8;
  font-family: "exo";
  font-weight: bold;
}

#editarSmall {
  background-color: #f0cd6e;
  color: #fdfcf8;
  font-family: "exo";
  font-weight: bold;
}

#progresso-smaller {
  width: 40%;
  height: 100%;
  color: #f0cd6e;
  border-radius: 10px;
  z-index: 1;
}

#infoSmaller {
  color: #f0cd6e;
}

#infoSmallerP {
  color: #fdfcf8;
  font-family: "exo";
  font-weight: normal;
}

#informacoes {
  margin-top: 20px;
}
#divavatar {
  border-radius: 10px;
  background-color: #fdfcf8;
  width: 83px;
  height: 90px;
  margin: 10px;
}
#perfilInfo {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
}
#titleRef {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  z-index: 1;
}

#titleBadge {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  z-index: 1;
}
#expRef {
  color: #fdfcf8;
  font-family: "Spinnaker";
  z-index: 1;
}

#refCard {
  background-color: #f0cd6e;
  color: #fdfcf8;
}
#linha {
  left: 400px;
  bottom: 10px;
}
#editar {
  background-color: #f0cd6e;
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  position: relative;
  left: 10px;
  top: -20px;
}

#biografia h3 {
  color: #f0cd6e;
  font-family: "Exo";
  font-weight: bold;
  position: relative;
  left: 10px;
}
#biografia p {
  color: #fdfcf8;
  font-family: "Spinnaker";
  position: relative;
  left: 10px;
}

#infos p {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
}

#info {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
  background-color: #0c3745;
  border-radius: 10px;
}

#blobdiv {
  position: absolute;
  z-index: 0;
  left: 30%;
  top: 60%;
}
#blobSvg {
  width: 700px;
  height: 700px;
}

#titulo {
  color: #fdfcf8;
  font-family: "Exo";
  font-weight: bold;
}

/* Media queries */
@media (max-width: 600px) {
  #blobdiv {
    position: absolute;
    z-index: 0;
    left: 10%;
    top: 90%;
  }
  #blobSvg {
    width: 300px;
    height: 300px;
  }
}

@media (min-with: 600px) and (max-width: 1000px) {
  #blobdiv {
    position: absolute;
    z-index: 0;
    left: 20%;
    top: 80%;
  }
  #blobSvg {
    width: 400px;
    height: 400px;
  }
}
</style>
