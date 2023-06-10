<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Random Recipes" :class="{
      center: true
    }" :isRandomRecipes="true">
    </RecipePreviewList>
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    <RecipePreviewList title="Last Viewed Recipes" :class="{
      blur: !$root.store.username,
      center: true
    }" :isLastViewedRecipes="true" disabled>
    </RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
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
