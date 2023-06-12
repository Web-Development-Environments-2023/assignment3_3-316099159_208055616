<template>
  <div class="container">
    <div v-if="recipe">
      <RecipeFull :key="recipe.id" :recipe="recipe"></RecipeFull>
    </div>
    <button @click="addToFavorites(recipe.id)" v-if="recipe">Add to favorites</button>
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
    async addToFavorites(recipeId) {
      const response = await apiCalls.apiAddToFavorites(this.$route.params.recipeId);
      if (response.status === 200) {
        this.$root.toast("AddToFavorites", "Recipe added to favorites", "success");
      }
      else {
        this.$root.toast("AddToFavorites", "Recipe not added to favorites", "fail");
      }
    }
  },
  async mounted() {
    // getting the recipe from the server
    const recipe_id = this.$route.params.recipeId
    const response = await apiCalls.apiGetRecipeById(recipe_id)
    if (response.status !== 200) {
      this.$router.replace("/NotFound");
      return
    }
    const addResponse = await apiCalls.apiAddToLastWatched(parseInt(recipe_id));
    if (addResponse.status === 200) {
      this.$root.toast("AddToLastWatched", "Recipe added to last watched", "success");
    }
    else {
      this.$root.toast("AddToLastWatched", "Recipe not added to last watched", "fail");
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
