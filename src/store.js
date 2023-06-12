import Vue from 'vue';
import Vuex from 'vuex';
import  * as apiCalls from './api_calls';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: null,
    randomRecipes: [],
    lastWatchedRecipes: [],
  },


  mutations: {
    setUsername(state, newUsername) {
      state.username = newUsername;
    },

    setRandomRecipes(state, recipes) {
      state.randomRecipes = recipes;
    },

    setLastViewdRecipes(state, recipes) {
      state.lastWatchedRecipes = recipes;
    },
  },


  actions: {
    updateUsername({ commit }, newUsername) {
      commit('setUsername', newUsername);
    },

    async login({ commit }, { username, password }) {
      try {
        const response = await apiCalls.apiLogin(username, password);
        if (response.status === 200) {
          commit('setUsername', username);
          localStorage.setItem("username", username);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async logout({ commit }) {
      localStorage.removeItem("username");
      try {
        const response = await apiCalls.apiLogout();
        if (response.status === 200) {
          commit('setUsername', null);
          localStorage.removeItem("username");
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    updateRandomRecipes({ commit }) {
      apiCalls.apiGetRandomRecipes()
      .then((response) => {
        if (response.status === 200) {
          commit('setRandomRecipes', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },

    updateLastWatchedRecipes({ commit }) {
      apiCalls.apiGetLastWatched()
      .then((response) => {
        if (response.status === 200) {
          commit('setLastWatchedRecipes', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },


  getters: {
    getUsername(state) {
      return state.username;
    },

    getRandomRecipes(state) {
      return state.randomRecipes;
    },

    getLastWatchedRecipes(state) {
      return state.lastWatchedRecipes;
    },
  },
});

export default store;