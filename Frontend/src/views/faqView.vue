<template>
  <div class="faq">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>
    <main>
      <h1 id="tittle">Perguntas mais frequentes</h1>
      <br />
      <br />
      <div id="perguntas" class="d-flex align-items-center mx-auto">
        <v-row>
          <v-cols cols="12">
            <v-expansion-panels class="perguntas">
              <v-expansion-panel
                id="pergunta1"
                title="Como posso começar a procurar um ecoponto?"
                text="Depois de criada uma conta e feito o login será redirecionado para a página do mapa onde irão aparecer todos os ecopontos, interagindo com o mapa vai conseguir ver todos os ecopontos."
              >
              </v-expansion-panel>
              <v-expansion-panel
                id="pergunta2"
                title="É necessário ativar a localização do telemóvel?"
                text="Sim, é necessário ativar a localização para que a aplicação possa mostrar o ecoponto mais próximo de você e direcioná-lo até ele. Além disso, a localização é importante para que a aplicação possa validar a autenticidade dos ecopontos registrados pelos utilizadores. Sem a ativação da localização, a aplicação não poderá fornecer todos os recursos e benefícios disponíveis."
              >
              </v-expansion-panel>
              <v-expansion-panel
                id="pergunta3"
                title="Como posso obter Badges?"
                text="Os badges são recompensas virtuais que podem ser obtidas por completar determinadas tarefas ou atingir certos objetivos dentro da aplicação. Cada badge tem suas próprias regras e critérios de obtenção, que podem variar de acordo com a aplicação. Para obter badges, você precisa cumprir as condições estabelecidas para cada um deles, como registrar um determinado número de ecopontos ou utilizar a aplicação por um período prolongado. Depois de cumprir as condições, o badge será adicionado à sua conta e poderá ser exibido em seu perfil ou compartilhado nas redes sociais. "
              >
              </v-expansion-panel>
              <v-expansion-panel
                id="pergunta4"
                title="Como é que aplicação valida a localização de um ecoponto?"
                text="Quando um utilizador regista um ecoponto, ele deve indicar as suas coordenadas. Depois disso, o ecoponto aparecerá no mapa com a indicação de 'por verificar'. Se pelo menos três utilizadores registarem o mesmo ecoponto, ele será considerado totalmente validado e os utilizadores receberão os devidos pontos. Outra forma de um ecoponto ser validado é por um administrador da aplicação."
              >
              </v-expansion-panel>
            </v-expansion-panels>
          </v-cols>
        </v-row>
      </div>
      <div class="d-flex align-items-center mx-auto" id="faqImage">
        <v-responsive>
          <v-img src="src/assets/imgs/faq-image.png"></v-img>
        </v-responsive>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.faq {
  background-image: url("../assets/imgs/faqbackground.svg");
  min-height: 1080px;
}
#faqImage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 445px;
  height: 442px;
}

main {
  margin: 0 10px;
}

#faqImage {
  margin: 0 auto;
}

#perguntas {
  max-width: 787px;
  margin: 0 auto;
}
.perguntas {
  max-width: 787px;
}

#pergunta1 {
  background-color: #114b5f;
  color: #fdfcf8;
  font-family: "Exo";
  border-radius: 10px;
}
#pergunta2 {
  background-color: #114b5f;
  color: #fdfcf8;
  font-family: "Exo";
  border-radius: 10px;
  margin-top: 20px;
}
#pergunta3 {
  background-color: #114b5f;
  color: #fdfcf8;
  font-family: "Exo";
  border-radius: 10px;
  margin-top: 20px;
}
#pergunta4 {
  background-color: #114b5f;
  color: #fdfcf8;
  font-family: "Exo";
  border-radius: 10px;
  margin-top: 20px;
}

#tittle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-family: "Exo";
  font-weight: bold;
  color: #fdfcf8;
}

@media (max-width: 576px) {
  nav {
    width: 97%;
  }
}

@media (max-width: 768px) {
  nav {
    width: 97%;
  }
}

@media (min-width: 992px) {
  nav {
    width: 97%;
  }
}

@media (max-width: 1200px) {
  nav {
    width: 97%;
  }
}

@media (min-width: 1400px) {
  nav {
    width: 88%;
  }
}
</style>
