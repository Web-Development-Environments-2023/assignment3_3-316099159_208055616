<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isLastViewedRecipes: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isRandomRecipes: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      recipes: [],
      isUpdated: false
    };
  },
  mounted() {
    if (!this.isUpdated)
      this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        let response;
        if (this.$props.isRandomRecipes) {
          response = await this.axios.get(
            this.$root.store.server_domain + "/recipes/random",
            // "https://test-for-3-2.herokuapp.com/recipes/random"
            { withCredentials: true }
          );
        }
        else if (this.$props.isLastViewedRecipes) {
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/lastWatched",
            // "https://test-for-3-2.herokuapp.com/recipes/random"
            { withCredentials: true }
          );
        }
        else {
          return;
        }
        console.log(response);
        const recipes = response.data;
        this.recipes.push(...recipes);
        this.isUpdated = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
