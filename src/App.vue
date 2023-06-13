<template>
  <div id="app">
    <Navbar :onLogout="onLogout"></Navbar>
    <keep-alive exclude="RecipeViewPage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
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
}
</style>
