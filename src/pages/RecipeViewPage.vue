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
    async getRecipeById(recipe_id) {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,
          { recipeId: recipe_id },
          { withCredentials: true }
        );
        return response;
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
        return;
      }
    },
    async addToFavorites(recipe_id) {
      try {
        const response = await this.axios.put(
          this.$root.store.server_domain + `/users/favorites`,
          { recipeId: recipe_id },
          { withCredentials: true }
        );
        this.$root.toast("Add to favorites", "Recipe added to favorites", "success");
        return response;
      } catch (error) {
        console.log(error);
        this.$root.toast("Add to favorites", error.response.data.message, "fail")
        return;
      }
    },
    async addToLastWatched(recipe_id) {
      try {
        const response = await this.axios.put(
          this.$root.store.server_domain + `/users/lastWatched`,
          { recipeId: recipe_id },
          { withCredentials: true }
        );
        this.$root.toast("Add to last watched", "Recipe added to last watched", "success");
        return response;
      } catch (error) {
        console.log(error);
        this.$root.toast("Add to last watched", error.response.data.message, "fail")
        return;
      }
    }
  },
  async mounted() {
    // getting the recipe from the server
    const recipe_id = this.$route.params.recipeId
    const response = await this.getRecipeById(recipe_id);
    if (!response)
      return;
    if (response.status !== 200)
      this.$router.replace("/NotFound");
    console.log("response.data", response.data);

    await this.addToLastWatched(parseInt(recipe_id));

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
    console.log("this.recipe", this.recipe);
  }
};
</script>
