import { defineStore } from "pinia";
import { UtilizacoesService } from "../services/utilizacoes.service";

export const utilizacaoStore = defineStore("utilizacao", {
  state: () => ({
    utilizacoes: [],
  }),
  getters: {
    getUtilizacoes: (state) => state.utilizacoes,

    getUtilizacaoById: (state) => (id) => {
      return state.utilizacoes.find((utilizacao) => utilizacao.id == id);
    },

    getUtilizacoesPorAprovar: (state) => {
      return state.utilizacoes.filter(
        (utilizacao) =>
          utilizacao.aprovado == false && utilizacao.rejeitado == false
      );
    },
  },
  actions: {
    async getUtilizacoesPendentes() {
      const response = await UtilizacoesService.getUtilizacoesPendentes();
      this.setUtilizacoes(response);
    },
    setUtilizacoes(utilizacoes) {
      this.utilizacoes = utilizacoes;
    },
    async registarUtilizacao(id, data) {
      try {
        const response = await UtilizacoesService.registarUtilizacao(id, data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },


    async validarUtilizacao(id, data) {
      try {
        const response = await UtilizacoesService.validarUtilizacao(id, data);
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
