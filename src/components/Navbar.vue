<template>
  <div class="myNavbar">
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
        <b-navbar-nav v-if="!username" class="ml-auto">
          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-text>Guest:</b-nav-text>
            </b-navbar-nav>
          </b-collapse>
          <b-nav-item :to="{ name: 'register' }" tag="router-link" class="nav-link">
            Register
          </b-nav-item>
          <b-nav-item :to="{ name: 'login' }" tag="router-link" class="nav-link">
            Login
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item>
            <b-nav-item-dropdown :text="username" right>
              <b-dropdown-item :to="{ name: 'favoriteRecipes' }">Favorite Recipes</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'myRecipes' }">Recipes</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'familyRecipes' }">Family Recipes</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-item>
          <b-nav-item :to="{ name: 'createRecipe' }" class="nav-link">
            Create Recipe
          </b-nav-item>
          <b-nav-item @click="onLogout" class="nav-link">
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
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.myNavbar {
  margin-bottom: 20px;
}
</style>