import { defineStore } from "pinia";
import { BadgeService } from "../services/badge.service";

export const badgeStore = defineStore("badge", {
  state: () => ({
    badges: [],
  }),
  getters: {
    getAllBadges: (state) => state.badges,
  },
  actions: {
    async deleteBadge(id) {
      try {
        const response = await BadgeService.deleteBadge(id);
        return response;
      } catch (error) {
        throw (error);
      }
    },
    async getBadges() {
      try {
        const response = await BadgeService.getBadges();
        this.setBadges(response);
      } catch (error) {
        console.log(error);
      }
    },
    setBadges(badges) {
      this.badges = badges;
    },
    async editBadge(id, data) {
      try {
        const response = await BadgeService.editBadge(id, data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
