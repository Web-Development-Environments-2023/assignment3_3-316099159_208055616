<template>
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
    <b-card v-if="image_load" :title="recipe.title"
      :img-src="image_exists ? recipe.image : '../assets/image-placeholder.png'" img-top tag="article"
      style="max-width: 20rem;" class="mb-2">
      <b-card-text>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.popularity }} likes</li>
        </ul>
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
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_exists = true;
      this.image_load = true;
    }).catch((e) => {
      this.image_exists = false;
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      image_exists: false
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
.icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.icon {
  width: 35px;
  height: 35px;
  margin: 10px 10px;
}
</style>
