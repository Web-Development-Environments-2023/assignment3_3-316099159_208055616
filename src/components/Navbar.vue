<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }" tag="router-link" class="nav-link">
        Main Page
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }" tag="router-link" class="nav-link">
            Search
          </b-nav-item>
          <b-nav-item :to="{ name: 'about' }" tag="router-link" class="nav-link">
            About
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="!username">Guest:</b-nav-text>
          <b-nav-item v-if="!username" :to="{ name: 'register' }" tag="router-link" class="nav-link">
            Register
          </b-nav-item>
          <b-nav-item v-if="!username" :to="{ name: 'login' }" tag="router-link" class="nav-link">
            Login
          </b-nav-item>
          <b-nav-text v-if="username">{{ username }}</b-nav-text>
          <b-nav-item-dropdown v-if="username" text="Profile" right>
            <b-dropdown-item :to="{ name: 'favoriteRecipes' }">Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }">Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'familyRecipes' }">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="username" :to="{ name: 'createRecipe' }" class="nav-link">
            Create Recipe
          </b-nav-item>
          <b-nav-item v-if="username" @click="onLogout" class="nav-link">
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Navbar",
  computed: {
    ...mapState({
      username: state => state.username,
    }),
  },
  props: {
    onLogout: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>