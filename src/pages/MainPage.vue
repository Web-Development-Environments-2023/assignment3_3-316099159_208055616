<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Random Recipes" :class="{
      center: true
    }" :recipes="randomRecipes">
    </RecipePreviewList>
    <router-link v-if="!username" to="/login" tag="button">You need to Login to vue this</router-link>
    <RecipePreviewList title="Last Viewed Recipes" :class="{
      blur: !username,
      center: true
    }" :recipes="lastWatchedRecipes">
    </RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
  name: "MainPage",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username,
      randomRecipes: state => state.randomRecipes,
      lastWatchedRecipes: state => state.lastWatchedRecipes
    }),
  },
  mounted() {
    this.$store.dispatch("updateRandomRecipes");
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px);
  /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
