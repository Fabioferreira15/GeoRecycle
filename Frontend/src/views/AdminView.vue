<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" id="drawer" permanent>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title" @click="changeContainer(item.title)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-btn @click="$router.push('home')" color="primary">Voltar</v-btn>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid app>
        <v-card v-if="currentContainer === 'Dashboard'">
          <h1>Dashboard</h1>
          <div class="dashboard-stats">
            <v-card color="#114b5f" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5"> Utilizadores </v-card-title>

                  <v-card-subtitle>Número de utilizadores: {{ totalUsers }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" @click="changeContainer('Utilizadores')" size="small">
                      Ver mais
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-icon size="56" icon="fa-solid fa-users"></v-icon>
                </v-avatar>
              </div>
            </v-card>
            <br />
            <v-card color="#114b5f" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5"> Loja </v-card-title>

                  <v-card-subtitle>Número de items:{{ totalItems }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" @click="changeContainer('Itens da Loja')" size="small">
                      Ver mais
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-icon size="56" icon="fa-sharp fa-solid fa-store"></v-icon>
                </v-avatar>
              </div>
            </v-card>
            <br />
            <v-card color="#114b5f" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    Ecopontos por aprovar
                  </v-card-title>

                  <v-card-subtitle>Número de ecopontos: {{ totalEcopoints }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" @click="changeContainer('Ecopontos por Aprovar')" size="small">
                      Ver mais
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-icon size="56" icon="fa-solid fa-dumpster"></v-icon>
                </v-avatar>
              </div>
            </v-card>
            <br />
            <v-card color="#114b5f" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    Utilizações por aprovar
                  </v-card-title>

                  <v-card-subtitle>Número de ecopontos: {{ totalUtilizacoes }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" @click="changeContainer('Utilizações por Aprovar')"
                      size="small">
                      Ver mais
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-icon size="56" icon="fa-solid fa-recycle"></v-icon>
                </v-avatar>
              </div>
            </v-card>
          </div>
        </v-card>

        <v-container v-else-if="currentContainer === 'Utilizadores'">
          <h1>Utilizadores</h1>
          <v-table fixed-header height="300px" style="width: 100%">
            <thead>
              <tr>
                <th class="text-left">Tipo</th>
                <th class="text-left">Nome</th>
                <th class="text-left">Email</th>
                <th class="text-left">Pontos</th>
                <th class="text-left">Nível</th>
                <th class="text-left">Moedas</th>
                <th class="text-left">Utilizações</th>
                <th class="text-left">Ecopontos registados</th>
                <th class="text-left">Referral</th>
                <th class="text-left">ReferredBy</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users">
                <td>{{ user.tipo }}</td>
                <td>{{ user.nome }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.pontos }}</td>
                <td>{{ user.nivel }}</td>
                <td>{{ user.moedas }}</td>
                <td>{{ user.numUsoEcopontos }}</td>
                <td>{{ user.ecopontosRegistados }}</td>
                <td>{{ user.referral }}</td>
                <td>{{ user.referredBy }}</td>

                <td>
                  <v-btn color="error" @click="deleteUser(user._id)">Remover</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>

        <v-container v-else-if="currentContainer === 'Itens da Loja'">
          <h1>Itens da Loja</h1>
          <v-table fixed-header height="300px" style="width: 80%">
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">Stock</th>
                <th class="text-left">Preço</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itensLoja">
                <td>{{ item.nome }}</td>
                <td :id="'stock' + item._id">{{ item.stock }}</td>
                <td :id="'preco' + item._id">{{ item.preco }}</td>
                <td>
                  <v-btn color="success" @click="editarItem(item._id)" v-if="editar == item._id">Guardar</v-btn>
                  <v-btn color="primary" @click="editarItem(item._id)" :id="'botao' + item._id" v-else
                    :disabled="editar != null && editar != item._id">Editar</v-btn>
                  <v-btn color="error" @click="cancelarI(item._id)" v-if="editar == item._id">Cancelar</v-btn>
                  <v-btn color="error" @click="deleteItem(item._id)" v-else :disabled="editar != null">Remover</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>

        <v-card v-else-if="currentContainer === 'Badges'">
          <h1>Badges</h1>
          <v-table fixed-header height="300px" style="width: 80%">
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">Foto</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="badge in badges">
                <td :id="'nome' + badge._id">{{ badge.nome }}</td>
                <td :id="'foto' + badge._id">{{ badge.foto }}</td>
                <td>
                  <v-btn color="success" @click="editBadge(badge._id)" v-if="editarB == badge._id">Guardar</v-btn>
                  <v-btn color="primary" @click="editBadge(badge._id)" :id="'botaoBadge' + badge._id" v-else
                    :disabled="editarB != null && editarB != badge._id">Editar</v-btn>
                  <v-btn color="error" @click="cancelarEditB(badge._id)" v-if="editarB == badge._id">Cancelar</v-btn>
                  <v-btn color="error" @click="deleteBadge(badge._id)" v-else :disabled="editarB != null">Remover</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <v-card v-else-if="currentContainer === 'Utilizações por Aprovar'">
          <h1>Utilizações por Aprovar</h1>
          <v-divider></v-divider>
          <div v-for="utilizacao in utilizacoes">
            <img :src="utilizacao.foto" width="600" height="300" /><br />
            <p>Nome do Utilizador: {{ getUsersNameById(utilizacao.idUser) }}</p>
            <p>Data: {{ utilizacao.data }}</p>
            <v-btn color="success" @click="validarUtilizacao(utilizacao._id)">
              Aprovar
            </v-btn>
            <v-btn color="error" @click="rejeitarUtilizacao(utilizacao._id)">
              Rejeitar
            </v-btn>
            <br /><br /><br /><br />
          </div>
        </v-card>

        <v-card v-else-if="currentContainer === 'Ecopontos por Aprovar'">
          <h1>Ecopontos por Aprovar</h1>
          <v-divider></v-divider>
          <div v-for="ecoponto in ecopontos">
            <img :src="ecoponto.foto" width="600" height="300" /><br />
            <p>Nome do Utilizador: {{ getUsersNameById(ecoponto.userId) }}</p>
            <p>Data: {{ ecoponto.dataCriacao }}</p>
            <p>Morada:
              <!-- <input type="text" v-if="editarMorada" :id="'inputEcoponto' + ecoponto._id"><span v-else
                :id="'morada' + ecoponto._id">{{
                  ecoponto.morada }}</span>
              &nbsp;&nbsp;<span v-if="editarMorada"><v-btn size="x-small"
                  @click="editarM(ecoponto._id)">&#x2713;</v-btn></span><span v-else><v-btn size="x-small"
                  @click="editarM(ecoponto._id)">&#9998;</v-btn></span> -->
              <span :id="'ecoponto' + ecoponto._id">
                {{ ecoponto.morada }}
              </span>
              <span>
                <v-btn size="x-small" :id="'botaoEcoponto' + ecoponto._id" @click="editarM(ecoponto._id)">&#9998;</v-btn>
              </span>
            </p><br>
            <v-btn color="success" @click="validarEcoponto(ecoponto._id)">
              Aprovar
            </v-btn>
            <v-btn color="error" @click="rejeitarEcoponto(ecoponto._id)">
              Rejeitar
            </v-btn>
            <br /><br /><br /><br />
          </div>
        </v-card>
      </v-container>
    </v-main>
    <v-snackbar ref="snackbar" v-model="snackbar" :timeout="2000" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
    <v-snackbar ref="snackbar2" v-model="snackbar2" :timeout="2000" color="success" @input="handleSnackbarClose">
      {{ snackbarMessage2 }}
    </v-snackbar>
    <v-snackbar ref="aguardando" v-model="aguardando" :timeout="50000" color="info">
      Aguarde, a processar...
    </v-snackbar>
  </v-app>
</template>

<script>
import { userStore } from "../stores/userStore.js";
import { lojaStore } from "../stores/lojaStore.js";
import { badgeStore } from "../stores/badgesStore.js";
import { utilizacaoStore } from "../stores/utilizacaoStore.js";
import { EcopontosService } from "../services/ecopontos.service";
import { ecopontoStore } from "../stores/ecopontoStore.js";

export default {
  data() {
    return {
      drawer: true,
      currentContainer: "Dashboard",
      menuItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Utilizadores", icon: "mdi-account-group" },
        { title: "Itens da Loja", icon: "mdi-cart" },
        { title: "Badges", icon: "mdi-certificate" },
        { title: "Utilizações por Aprovar", icon: "mdi-check-circle" },
        { title: "Ecopontos por Aprovar", icon: "mdi-earth" },
      ],
      users: [],
      store: userStore(),
      utilizacaoStore: utilizacaoStore(),
      lojaStore: lojaStore(),
      badgeStore: badgeStore(),
      ecopontoStore: ecopontoStore(),
      ecopontoService: EcopontosService,
      itensLoja: [],
      snackbar: false,
      snackbarMessage: "",
      snackbar2: false,
      snackbarMessage2: "",
      aguardando: false,
      editar: null,
      editarB: null,
      editarMorada: null,
      moradaOriginal: null,
      precoOriginal: null,
      stockOriginal: null,
      nomeBadgeOriginal: null,
      fotoBadgeOriginal: null,
      badges: [],
      ecopontos: [],
      utilizacoes: [],
      totalUsers: 0,
      totalItems: 0,
      totalEcopoints: "",
      totalUtilizacoes: "",
      appBarColor: "#114B5F",
    };
  },
  async mounted() {
    await this.getUsersList();
    await this.getAllItems();
    await this.getBadges();
    await this.getUtilizacoesPendentes();
    await this.getEcopontos();
  },
  methods: {
    changeContainer(title) {
      this.currentContainer = title;
    },
    async getUsersList() {
      try {
        await this.store.getALlUsers();
        this.users = this.store.getUsers;
        this.totalUsers = this.users.length;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(id) {
      this.aguardando = true;
      try {
        await this.store.deleteUserById(id);
        this.users = this.users.filter((user) => user._id !== id);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Utilizador removido com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.snackbarMessage = error;
        this.snackbarMessage = error;
      }
    },
    async getAllItems() {
      try {
        await this.lojaStore.getAllItems();
        this.itensLoja = this.lojaStore.getItens;
        this.totalItems = this.itensLoja.length;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(id) {
      this.aguardando = true;
      try {
        await this.lojaStore.deleteItem(id);
        this.itensLoja = this.itensLoja.filter((item) => item._id !== id);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Item removido com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
    async editarItem(id) {
      const linhaPreco = document.getElementById("preco" + id);
      this.precoOriginal = linhaPreco.textContent;
      const linhaStock = document.getElementById("stock" + id);
      this.stockOriginal = linhaStock.textContent;

      if (this.editar == null) {
        this.editar = id;

        const precoAtual = linhaPreco.textContent;
        const stockAtual = linhaStock.textContent;

        linhaPreco.innerHTML = `<input type="number" style="width:50%" value="${precoAtual}">`;
        linhaStock.innerHTML = `<input type="number" style="width:50%" value="${stockAtual}">`;
      } else {
        this.editar = null;
        const novoPreco = linhaPreco.querySelector("input").value;
        const novoStock = linhaStock.querySelector("input").value;

        linhaPreco.textContent = novoPreco;
        linhaStock.textContent = novoStock;
        this.aguardando = true;
        try {
          await this.lojaStore.editItem(id, {
            stock: novoStock,
            preco: novoPreco,
          });
          this.snackbar2 = true;
          this.aguardando = false;
          this.snackbarMessage2 = "Item editado com sucesso!";
        } catch (error) {
          this.snackbar = true;
          this.aguardando = false;
          this.snackbarMessage = error;
        }
      }
    },
    async getBadges() {
      try {
        await this.badgeStore.getBadges();
        this.badges = this.badgeStore.getAllBadges;
      } catch (error) {
        console.log(error);
      }
    },
    cancelarI(id) {
      if (this.editar != null) {
        const linhaPreco = document.getElementById("preco" + id);
        const linhaStock = document.getElementById("stock" + id);

        linhaPreco.textContent = this.precoOriginal;
        linhaStock.textContent = this.stockOriginal;

        this.editar = null;
      } else {
        this.lojaStore.deleteItem(id);
        this.itensLoja = this.lojaStore.getItens;
      }
    },
    async editBadge(id) {
      const linhaNome = document.getElementById("nome" + id);
      this.nomeBadgeOriginal = linhaNome.textContent;
      const linhaFoto = document.getElementById("foto" + id);
      this.fotoBadgeOriginal = linhaFoto.textContent;

      if (this.editarB == null) {
        this.editarB = id;

        const nomeAtual = linhaNome.textContent;
        const fotoAtual = linhaFoto.textContent;

        linhaNome.innerHTML = `<input type="text" style="width:50%" value="${nomeAtual}">`;
        linhaFoto.innerHTML = `<input type="text" style="width:50%" value="${fotoAtual}">`;
      } else {
        this.editarB = null;
        const novoNome = linhaNome.querySelector("input").value;
        const novaFoto = linhaFoto.querySelector("input").value;

        linhaNome.textContent = novoNome;
        linhaFoto.textContent = novaFoto;
        this.aguardando = true;
        try {
          await this.badgeStore.editBadge(id, {
            nome: novoNome,
            foto: novaFoto,
          });
          this.snackbar2 = true;
          this.aguardando = false;
          this.snackbarMessage2 = "Badge editada com sucesso!";
        } catch (error) {
          this.snackbar = true;
          this.aguardando = false;
          this.snackbarMessage = error;
        }
      }
    },
    async deleteBadge(id) {
      this.aguardando = true;
      try {
        await this.badgeStore.deleteBadge(id);
        this.badges = this.badges.filter((badge) => badge._id !== id);
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Badge removida com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
    cancelarEditB(id) {
      if (this.editarB != null) {
        const linhaNome = document.getElementById("nome" + id);
        const linhaFoto = document.getElementById("foto" + id);

        linhaNome.textContent = this.nomeBadgeOriginal;
        linhaFoto.textContent = this.fotoBadgeOriginal;

        this.editarB = null;
      } else {
        this.badges = this.badges.filter((badge) => badge.id != id);
      }
    },
    async getUtilizacoesPendentes() {
      try {
        await this.utilizacaoStore.getUtilizacoesPendentes();
        this.utilizacoes = this.utilizacaoStore.getUtilizacoes;
        this.totalUtilizacoes = this.utilizacoes.length;
      } catch (error) {
        this.totalUtilizacoes = error;
      }
    },
    async validarUtilizacao(id) {
      this.aguardando = true;
      try {
        await this.utilizacaoStore.validarUtilizacao(id, {
          utilizacaoAprovada: true,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Utilização validada com sucesso!";
        setTimeout(async () => {
          await this.getUtilizacoesPendentes();
        }, 2000);
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },

    async getEcopontos() {
      try {
        const ecopontos = await this.ecopontoStore.getEcopontosPorValidar();
        this.ecopontos = ecopontos;
        this.totalEcopoints = ecopontos.length;
      } catch (error) {
        this.totalEcopoints = error;
      }
    },
    async validarEcoponto(id) {
      this.aguardando = true;
      try {
        await this.ecopontoStore.validarEcoponto(id, {
          ecopontoAprovado: true,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Ecoponto validado com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },
    async rejeitarEcoponto(id) {
      this.aguardando = true;
      try {
        await this.ecopontoStore.validarEcoponto(id, {
          ecopontoAprovado: false,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Ecoponto rejeitado com sucesso!";
        setTimeout(async () => {
          await this.getEcopontos();
        }, 2000);
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
        setTimeout(async () => {
          await this.getEcopontos();
        }, 2000);
      }
    },
    getUsersNameById(id) {
      const user = this.users.find((user) => user._id === id);
      return user.nome;
    },
    async validarUtilizacao(id) {
      this.aguardando = true;
      try {
        await this.utilizacaoStore.validarUtilizacao(id, {
          utilizacaoAprovada: true,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Utilização validada com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },

    async rejeitarUtilizacao(id) {
      this.aguardando = true;
      try {
        await this.utilizacaoStore.validarUtilizacao(id, {
          utilizacaoAprovada: false,
        });
        this.snackbar2 = true;
        this.aguardando = false;
        this.snackbarMessage2 = "Utilização rejeitada com sucesso!";
      } catch (error) {
        this.snackbar = true;
        this.aguardando = false;
        this.snackbarMessage = error;
      }
    },

    async editarM(id) {
      if (this.editarMorada == null) {
        this.editarMorada = id;
        const linhaMorada = document.getElementById("ecoponto" + id);
        const botaoEditarMorada = document.getElementById("botaoEcoponto" + id)
        this.moradaOriginal = linhaMorada.textContent;
        linhaMorada.innerHTML = `<input type="text" style="width:50%" value="${this.moradaOriginal}">`;
        botaoEditarMorada.innerHTML = `<v-btn size="x-small" @click="editarM(${id})">&#x2713;</v-btn>`;
      } else {
        this.editarMorada = null;
        const linhaMorada = document.getElementById("ecoponto" + id);
        const botaoEditarMorada = document.getElementById("botaoEcoponto" + id)
        const novaMorada = linhaMorada.querySelector("input").value;
        linhaMorada.textContent = novaMorada;
        botaoEditarMorada.innerHTML = `<v-btn size="x-small" @click="editarM(${id})">&#9998;</v-btn>`;

        try {
          await this.ecopontoStore.editarEcoponto(id, {
            morada: novaMorada,
          });
          this.snackbar2 = true;
          this.snackbarMessage2 = "Morada editada com sucesso!";
        } catch (error) {
          this.snackbar = true;
          this.snackbarMessage = error;
        }
      }
    }
  },
};
</script>

<style>
#titleAdmin {
  color: #fdfcf8;
  font-family: "exo";
  font-weight: bold;
}

#drawer {
  background-color: #114b5f;
  color: #fdfcf8;
}
</style>
