import BakeryService from "@/services/BakeryService";

export const namespaced = true;

export const state = {
  hours: {},
};

export const mutations = {
  SET_HOURS(state, hours) {
    state.hours = hours;
  },
};

export const actions = {
  fetchHours({ commit }) {
    return BakeryService.getHours()
      .then((response) => {
        commit("SET_HOURS", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
};
