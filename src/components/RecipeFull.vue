<template>
  <div>
    <div class="recipe-header mt-3 mb-4">
      <h1>{{ recipe.title }}</h1>
      <img v-if="image_load" :src="recipe.image" class="center" />
    </div>
    <div class="recipe-body">
      <div class="wrapper">
        <div class="wrapped">
          <div class="mb-3">
            <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            <div>Likes: {{ recipe.popularity }} likes</div>
            <div v-if="recipe.servings">Servings: {{ recipe.servings }}</div>
            <div>
              Vegan:
              <span v-if="recipe.vegan">V</span>
              <span v-else>X</span>
            </div>
            <div>
              Vegaterian:
              <span v-if="recipe.vegetarian">V</span>
              <span v-else>X</span>
            </div>
            <div>
              Gluten Free:
              <span v-if="recipe.glutenFree">V</span>
              <span v-else>X</span>
            </div>
          </div>
          Ingredients:
          <ul v-if="recipe.extendedIngredients">
            <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
              {{ r.original }}
            </li>
          </ul>
          <span v-else> no Ingredients listed </span>
        </div>
        <div class="wrapped">
          Instructions:
          <ol v-if="recipe.instructions">
            <li v-for="s in recipe._instructions" :key="s.number">
              {{ s.step }}
            </li>
          </ol>
          <span v-else> no instructions listed </span>
        </div>
      </div>
    </div>
  </div>
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
.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>