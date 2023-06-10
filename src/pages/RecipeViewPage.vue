<template>
  <div class="container">
    <div v-if="recipe">
      <RecipeFull :key="recipe.id" :recipe="recipe"></RecipeFull>
    </div>
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
  async mounted() {
    try {
      // getting the recipe from the server
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,
          { withCredentials: true }
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      // mapping the response to the recipe object
      console.log("response.data", response.data);
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
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
