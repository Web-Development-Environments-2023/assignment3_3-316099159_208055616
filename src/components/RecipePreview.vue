<template>
  <div>
    <b-spinner v-if="isLoading" class="spinner" variant="info" label="Spinning"></b-spinner>
    <b-card v-show="isLoaded" :title="recipe.title" tag="article" style="max-width: 20rem;" class="mb-2">
      <b-card-text>
        <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
          <img :src=recipe.image @load="onImgLoad" @error="setAltImg" class="recipe_image" />
        </router-link>
        <div class="recipe-overview">
          <div>{{ recipe.readyInMinutes }} minutes</div>
          <div>{{ recipe.popularity }} likes</div>
        </div>
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
        <div class="properties">
          <img v-if="isWatched" src="../assets/eye-icon.png" class="icon" />
          <b-button @click="onfavoriteButtonClick" :disabled="!$store.state.username" :pressed="isFavorite" pill
            variant="outline-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg></b-button>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { apiGenericAddToUseresRecipes } from "../api_calls.js";
export default {
  beforeCreate() {
    this.isLoading = true;
    this.isLoaded = false;
  },
  mounted() {
    this.isWatched = this.hasRecipeBeenWatched();
    this.isFavorite = this.hasRecipeBeenFavorited();
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true
      this.isLoading = false
    },
    setAltImg(event) {
      event.target.src = require("../assets/image-placeholder.png");
      this.isLoaded = true
      this.isLoading = false
    },
    hasRecipeBeenWatched() {
      const watchedRecipes = this.$store.state.lastWatchedRecipes;
      for (let i = 0; i < watchedRecipes.length; i++) {
        if (watchedRecipes[i].id === this.recipe.id) {
          return true;
        }
      }
      return false;
    },
    hasRecipeBeenFavorited() {
      const favoriteRecipes = this.$store.state.favoriteRecipes;
      for (let i = 0; i < favoriteRecipes.length; i++) {
        if (favoriteRecipes[i].id === this.recipe.id) {
          return true;
        }
      }
      return false;
    },
    async onfavoriteButtonClick() {
      if (this.isFavorite) {
        this.$root.toast("AddToFavorites", "Recipe already in favorites", "fail");
        return;
      }
      const response = await apiGenericAddToUseresRecipes("favorites", this.recipe.id);
      if (!response) {
        this.$root.toast("AddToFavorites", "Recipe added to last watched", "fail");
        return;
      }
      else if (response.status !== 200) {
        this.$root.toast("AddToFavorites", response.data.message, "fail");
        return
      }
      else if (response.status === 200) {
        this.$root.toast("AddToFavorites", "Recipe added to last watched", "success");
        this.isFavorite = true;
        this.$store.dispatch("updateFavoriteRecipes");
      }
    }
  },
  data() {
    return {
      isLoading: true,
      isLoaded: false,
      isWatched: false,
      isFavorite: false,
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
.properties {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.recipe_image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 2px solid #ffffff;
  /* Border color and width */
  border-radius: 10px;
  /* Radius determines the roundness of the corners */
  margin-bottom: 20px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.spinner {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recipe_image:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

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
