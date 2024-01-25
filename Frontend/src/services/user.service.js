import API_URL from "./config.js";

export const UserService = {
  async getALlUsers() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data.users;
    } else {
      throw (response.message);
    }
  },

  async deleteUserById(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw (response.message);
    }
  },
  async updateUserById(id, data) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        biografia: data.biografia,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      const data = await response.json();
      throw (data.message);
    }
  },

  async updateUserPhotoById(id, formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores/${id}/foto`, {
      method: "PATCH",
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
      throw (data.message);
    }
  },

  async getUserByID(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      if (data) {
        return data.user;
      } else {
        throw (data.msg);
      }
    } else {
      const data = await response.json();
      throw (data.msg);
    }
  },
  async getBadgesUser(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizadores/${id}/badges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      if (data) {
        return data.badges;
      }
    } else {
      const data = await response.json();
      throw (data.msg);
    }
  },
  async getUtilizacoesUser(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/utilizacao/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      if (data) {
        return data.utilizacoes;
      }
    } else {
      const data = await response.json();
      throw (data.error);
    }
  },
};
