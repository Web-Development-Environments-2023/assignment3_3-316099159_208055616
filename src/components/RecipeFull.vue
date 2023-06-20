<template>
  <div>
    <b-spinner v-if="isLoading" variant="info" label="Spinning" class="spinner"></b-spinner>
    <div v-show="isLoaded">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src=recipe.image @load="onImgLoad" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
              <div v-if="recipe.servings">Servings: {{ recipe.servings }}</div>
              <div v-if="recipe.vegan || recipe.vegetarian || recipe.glutenFree">
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
              <div>
                <b-button @click="onfavoriteButtonClick" :pressed="isFavorite" pill variant="outline-danger"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                </b-button>
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
                <b-form-checkbox>{{ s.step }}</b-form-checkbox>
              </li>
            </ol>
            <span v-else> no instructions listed </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGenericAddToUseresRecipes } from "../api_calls.js";
export default {
  mounted() {
    this.isFavorite = this.hasRecipeBeenFavorited();
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true
      this.isLoading = false
    },
    async onfavoriteButtonClick() {
      if (this.isFavorite) {
        this.$root.toast("AddToFavorites", "Recipe already in favorites", "fail");
        this.isFavorite = true;
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
  },
  data() {
    return {
      isLoading: true,
      isLoaded: false,
      isFavorite: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    addToFavorites: {
      type: Function,
      required: true
    }
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

.spinner {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 35px;
  height: 35px;
  margin: 10px 10px;
}
</style>