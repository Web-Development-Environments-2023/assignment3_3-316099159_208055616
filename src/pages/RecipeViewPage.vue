<template>
  <div class="container">
    <div v-if="recipe">
      <RecipeFull :addToFavorites="addToFavorites" :key="recipe.id" :recipe="recipe"></RecipeFull>
    </div>
  </div>
</template>

<script>
import RecipeFull from "../components/RecipeFull.vue";
import * as apiCalls from "../api_calls.js";
export default {
  name: "RecipeViewPage",
  components: {
    RecipeFull
  },
  data() {
    return {
      recipe: null
    };
  },
  methods: {
    async addToFavorites(recipe_id) {
      const response = await apiCalls.apiGenericAddToUseresRecipes("favorites", recipe_id);
      if (!response) {
        this.$root.toast("AddToFavorites", "Recipe added to last watched", "fail");
        return;
      }
      else if (response.status !== 200) {
        this.$root.toast("AddToFavorites", response.data.message, "fail");
        return
      }
      else if (response.status === 200) {
        this.$root.toast("AddToFavorites", "Recipe added to last watched", "success");
        this.$store.dispatch("updateFavoriteRecipes");
      }
    }
  },
  async mounted() {
    // getting the recipe from the server
    const recipe_id = parseInt(this.$route.params.recipeId)
    const response = await apiCalls.apiGetRecipeById(recipe_id)
    if (!response || response.status !== 200) {
      this.$router.replace("/NotFound");
      return
    }
    const addResponse = await apiCalls.apiGenericAddToUseresRecipes("lastWatched", recipe_id);
    if (!addResponse) {
      this.$root.toast("AddToLastWatched", "Recipe added to last watched", "fail");
    }
    else if (addResponse.status !== 200) {
      this.$root.toast("AddToLastWatched", addResponse.data.message, "fail");
    }
    else if (addResponse.status === 200) {
      this.$root.toast("AddToLastWatched", "Recipe added to last watched", "success");
      this.$store.dispatch("updateLastWatchedRecipes");
    }


    // mapping the response to the recipe object
    const {
      id,
      title,
      readyInMinutes,
      image,
      popularity,
      vegan,
      vegetarian,
      glutenFree,
      extendedIngredients,
      analyzedInstructions,
      instructions,
      servings
    } = response.data;

    let _instructions = undefined;
    if (analyzedInstructions) {
      _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);
    }

    let _recipe = {
      id,
      title,
      readyInMinutes,
      image,
      popularity,
      vegan,
      vegetarian,
      glutenFree,
      extendedIngredients,
      analyzedInstructions,
      instructions,
      servings,
      _instructions
    };

    this.recipe = _recipe;
  }
};
</script>
