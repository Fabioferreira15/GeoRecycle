<template>
  <div class="Ranking">
    <v-container>
      <v-row>
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <h1 align="center" id="titulo">Leaderboard</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn @click="changeTable('maisPontos')" :class="{ 'active': tabela === 'maisPontos' }" id="pontos">Mais pontos</v-btn>
          <v-btn @click="changeTable('ecopontos')" :class="{ 'active': tabela === 'ecopontos' }" id="ecopontos">Ecopontos usados</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-table id="tabela" v-if="tabela == 'maisPontos'">
            <thead>
              <tr>
                <th class="text-left">Posição</th>
                <th class="text-left">Nomes</th>
                <th class="text-left">Pontos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users">
                <td>{{ index + 1 }}</td>
                <td>{{ user.nome }}</td>
                <td>{{ user.pontos }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-table id="tabela" v-else="tabela == 'ecopontos'">
            <thead>
              <tr>
                <th class="text-left">Posição</th>
                <th class="text-left">Nomes</th>
                <th class="text-left">Ecopontos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users">
                <td>{{ index + 1 }}</td>
                <td>{{ user.nome }}</td>
                <td>{{ user.numUsoEcopontos }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { userStore } from "../stores/userStore.js";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      store: userStore(),
      tabela: "maisPontos",
      users:[],
      
    };
  },
  async mounted() {
    await this.getLeaderboardPoints();
  },
  methods: {
    async getLeaderboardPoints(){
      try{
        const users = await this.store.getLeaderboardPoints();
        this.users = users;
        

      } catch (error){
        console.log(error);
      }
    },
    async getLeaderboardEcopontos(){
      try{
        const users = await this.store.getLeaderboardEcopontos();
        this.users = users;
        

      } catch (error){
        console.log(error);
      }
    },
    async changeTable(table) {
      this.tabela = table;
      if (table === "maisPontos") {
        await this.getLeaderboardPoints();
      } else if (table === "ecopontos") {
        await this.getLeaderboardEcopontos();
      }
    },
  },
};
</script>

<style scoped>
.Ranking {
  background: linear-gradient(180deg, #1a9360 0%, #00ad79 47.71%, #40ddae 100%);
  height: 100vh;
  width: 100vw;
}
#titulo {
  font-family: "Exo";
  font-weight: bold;
  color: #fdfcf8;
}
#tabela {
  border-radius: 10px;
}
.v-table {
  background-color: #114b5f;
  background: #114b5f;
  color: #fdfcf8;
}

#pontos{
  background-color: #F0CD6E;
  color: #fdfcf8;
}
#ecopontos{
  position: relative;
  left: 10px;
  background-color: #F0CD6E;
  color: #fdfcf8;
}
</style>
