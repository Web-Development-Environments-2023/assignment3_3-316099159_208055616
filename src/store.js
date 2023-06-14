import Vue from 'vue';
import Vuex from 'vuex';
import  * as apiCalls from './api_calls';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem("username"),
    lastWatchedRecipes: [],
    favoriteRecipes: [],
    myRecipes: [],
    searchLimit: 5,
    randomRecipes: [],
  },


  mutations: {
    setUsername(state, newUsername) {
      state.username = newUsername;
    },

    setLastWatchedRecipes(state, recipes) {
      state.lastWatchedRecipes = recipes;
    },

    setFavoriteRecipes(state, recipes) {
      state.favoriteRecipes = recipes;
    },

    setMyRecipes(state, recipes) {
      state.myRecipes = recipes;
    },

    setSearchLimit(state, limit) {
      state.searchLimit = limit;
    },

    setRandomRecipes(state, recipes) {
      state.randomRecipes = recipes;
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

    updateFavoriteRecipes({ commit }) {
      apiCalls.apiGenericGetUsersRecipes("favorites")
      .then((response) => {
        if (response.status === 200) {
          commit('setFavoriteRecipes', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },

    updateLastWatchedRecipes({ commit }) {
      apiCalls.apiGenericGetUsersRecipes("lastWatched")
      .then((response) => {
        if (response.status === 200) {
          commit('setLastWatchedRecipes', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },

    updateMyRecipes({ commit }) {
      apiCalls.apiGenericGetUsersRecipes("myRecipes")
      .then((response) => {
        if (response.status === 200) {
          commit('setMyRecipes', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },    

    updateSearchLimit({ commit }) {
      apiCalls.apiGetSearchLimit()
      .then((response) => {
        if (response.status === 200) {
          commit('setSearchLimit', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },

    updateRandomRecipes({ commit }) {
      apiCalls.apiGet3RandomRecipes()
      .then((response) => {
        if (response.status === 200) {
          commit('setRandomRecipes', response.data);
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

    getFavoriteRecipes(state) {
      return state.favoriteRecipes;
    },

    getLastWatchedRecipes(state) {
      return state.lastWatchedRecipes;
    },

    getMyRecipes(state) {
      return state.myRecipes;
    },

    getSearchLimit(state) {
      return state.searchLimit;
    },

    getRandomRecipes(state) {
      return state.randomRecipes;
    },
  },
});

export default store;