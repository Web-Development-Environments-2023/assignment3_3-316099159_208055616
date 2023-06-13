<template>
  <div class="container">
    <h1 class="title">Favorite Recipes Page</h1>
    <RecipePreviewList title="Favorite Recipes" :class="{
      center: true
    }" :recipes="favoriteRecipes" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
  name: "FavoriteRecipesPage",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username,
      favoriteRecipes: state => state.favoriteRecipes
    }),
  },
};
</script>
  