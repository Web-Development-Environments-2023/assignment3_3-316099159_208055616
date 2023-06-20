<template>
  <b-container class="recipePreivewList">
    <h3>
      {{ title }}:
    </h3>
    <b-row align-h="center">
      <b-col xs="12" sm="12" md="6" lg="4" xl="4" v-for="r in recipes" :key="r.id">
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
    recipes: {
      type: Array,
      required: true
    },
  },
};
</script>

<style lang="scss" scoped>
.recipePreivewList {
  border: 2px solid #96ccda;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px;
}
</style>
