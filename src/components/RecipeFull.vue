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
              Dietary Preferences:
              <div class="icons">
                <div v-if="recipe.vegan">
                  <img src="../assets/vegan-icon.jpg" class="icon" />
                </div>
                <div v-if="recipe.vegetarian && !recipe.vegan">
                  <img src="../assets/vegetarian-icon.png" class="icon" />
                </div>
                <div v-if="recipe.glutenFree">
                  <img src="../assets/gluten-free-icon.png" class="icon" />
                </div>
              </div>
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

.icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
  margin: 10px 10px;
}
</style>