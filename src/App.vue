<template>
  <div id="app">
    <Navbar :onLogout="onLogout"></Navbar>
    <keep-alive exclude="RecipeViewPage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { apiCreateNewRecipe } from "./api_calls";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    async onLogout() {
      const response = await this.$store.dispatch("logout");
      if (!response) {
        this.$root.toast("Logout", "Failed to logout", "fail");
        return;
      }
      else if (response.status !== 200) {
        this.$root.toast("Logout", response.data.message, "fail");
        return
      }
      else if (response.status === 200) {
        this.$root.toast("Logout", "User logged out successfully", "success");
      }
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    fetchUserRecipes() {
      this.$store.dispatch("updateLastWatchedRecipes");
      this.$store.dispatch("updateFavoriteRecipes");
      this.$store.dispatch("updateMyRecipes");
      apiCreateNewRecipe({})
    }
  },
  created() {
    if (this.$store.state.username) {
      this.fetchUserRecipes();
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  // background-image: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
