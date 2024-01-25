import { defineStore } from "pinia";
import { router } from "../router";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { leaderboardService } from "../services/leaderboard.service";

export const userStore = defineStore("userStore", {
  state: () => ({
    users: [],
  }),

  getters: {
    getUsers: (state) => state.users,
    getUserNameById: (state) => (userId) => {
      const user = state.users.find((user) => user.id === userId);
      return user ? user.name : '';
    },
  },

  actions: {
    async register(user) {
      const response = await AuthService.register(user);
      if (response) {
        router.push("/login");
      }
    },

    async login(user) {
      const response = await AuthService.login(user);
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
        this.loggedIn = true;
      }
    },
    logout() {
      AuthService.logout();
      this.loggedIn = false;
      router.push("/");
    },
    async getLeaderboardPoints() {
      try {
        const response = await leaderboardService.getLeaderboardPoints();
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getLeaderboardEcopontos() {
      try {
        const response = await leaderboardService.getLeaderboardEcopontos();
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getALlUsers() {
      try {
        const response = await UserService.getALlUsers();
        this.setUsers(response);
      } catch (error) {
        console.log(error);
      }
    },
    setUsers(users) {
      this.users = users;
    },
    async deleteUserById(id) {
      try {
        const response = await UserService.deleteUserById(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async getUserByID(id) {
      try {
        const response = await UserService.getUserByID(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async editUser(id, data) {
      try {
        const response = await UserService.updateUserById(id, data);
        if (response) {
          return response;
        }
      } catch (error) {
        throw (error);
      }
    },
    async getBadgesUser(id) {
      try {
        const response = await UserService.getBadgesUser(id);
        return response;
      } catch (error) {
        throw (error);
      }
    },
    async getUtilizacoesUser(id) {
      try {
        const response = await UserService.getUtilizacoesUser(id);
        return response;
      } catch (error) {
        throw (error);
      }
    },
  },
});
