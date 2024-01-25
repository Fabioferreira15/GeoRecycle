import API_URL from "./config.js";

export const UtilizacoesService = {
  async getUtilizacoesPendentes() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizacao/pendentes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data) {
        return data.utilizacoes;
      } else {
        throw (data.error);
      }
    } else {
      const data = await response.json();
      throw (data.error);
    }
  },
  async validarUtilizacao(id, data) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizacao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        utilizacaoAprovada: data.utilizacaoAprovada,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      throw (data.msg);
    }
  },
  async registarUtilizacao(idEcoponto, formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizacao/${idEcoponto}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      throw (data.msg);
    }
  },
};
