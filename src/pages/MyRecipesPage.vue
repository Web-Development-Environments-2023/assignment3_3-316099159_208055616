<template>
    <div class="container">
        <h1 class="title">My Recipes Page</h1>
        <RecipePreviewList title="My Recipes" :class="{
            center: true
        }" :recipes="myRecipes" />
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
    name: "MyRecipesPage",
    components: {
        RecipePreviewList
    },
    computed: {
        ...mapState({
            username: state => state.username,
            myRecipes: state => state.myRecipes
        }),
    },
    mounted() {
        if (this.username) {
            this.$store.dispatch("updateMyRecipes", this.username);
        }
    },
};


</script>
  