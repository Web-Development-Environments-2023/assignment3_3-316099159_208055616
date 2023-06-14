<template>
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
    <b-card v-if="image_load" :title="recipe.title" :img-src="recipe.image" img-top tag="article"
      style="max-width: 20rem;" class="mb-2">
      <b-card-text>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.popularity }} likes</li>
        </ul>
        <div v-if="recipe.vegan">
          <img src="../../vegan-icon.jpg" class="icon" />
        </div>
        <div v-if="recipe.vegetarian && !recipe.vegan">
          <img src="../../vegetarian-icon.png" class="icon" />
        </div>
        <div v-if="recipe.glutenFree">
          <img src="../../gluten-free-icon.png" class="icon" />
        </div>
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
  }
};
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  margin: 10px 10px;
}
</style>
