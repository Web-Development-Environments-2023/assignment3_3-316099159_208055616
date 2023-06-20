<template>
  <div class="container">
    <RecipePreviewList title="Explore This Recipes" :class="{
      center: true
    }" :recipes="randomRecipes">
    </RecipePreviewList>
    <div class="regenerateButton">
      <b-button variant="info" @click="this.onClickRegenerateRandomRecepies">Regenerate
        Recepies</b-button>
    </div>
    <RecipePreviewList title="Last Viewed Recipes" :class="{
      blur: !username,
      center: true
    }" :recipes="lastWatchedRecipes.slice(0, 3)">
    </RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
  name: "MainPage",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username,
      randomRecipes: state => state.randomRecipes,
      lastWatchedRecipes: state => state.lastWatchedRecipes
    }),
  },
  methods: {
    onClickRegenerateRandomRecepies() {
      this.$store.dispatch("updateRandomRecipes");
    },
  },
  mounted() {
    this.$store.dispatch("updateRandomRecipes");
    if (this.username) {
      this.$store.dispatch("updateLastWatchedRecipes", this.username);
    }
  },
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

.regenerateButton {
  margin: 20px;
  text-align: center;
}
</style>
