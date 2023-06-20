<template>
  <div>
    <div class="form">
      <h1 class="title">Search Page</h1>
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
        <div>Last Search: <b>{{ lastSearch }}</b></div>
        <b-form-group id="input-group-searchQuery" label-cols-sm="3" label="Query:" label-for="searchQuery">
          <b-form-input id="searchQuery" v-model="$v.form.searchQuery.$model" type="text"
            :state="validateState('searchQuery')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.searchQuery.required">
            Query is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-cuisines" label-cols-sm="3" label="Cuisines:" label-for="cuisines">
          <b-form-select id="cuisines" :options="cuisines"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-diets" label-cols-sm="3" label="Diets:" label-for="diets">
          <b-form-select id="diets" :options="diets"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-intolerances" label-cols-sm="3" label="Intolerances:" label-for="intolerances">
          <b-form-select id="intolerances" :options="intolerances"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-searchLimit" label-cols-sm="3" label="Results Limit:" label-for="searchLimit">
          <b-form-input id="searchLimit" v-model="$v.form.searchLimit.$model" :options="searchLimitOptions"
            :state="validateState('searchLimit')">{{ form.searchLimit }}</b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.searchLimit.required">
            searchLimit is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.searchLimit.inculdeIn">
            searchLimit must be 5, 10 or 15
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Search</b-button>
      </b-form>
      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Search failed: {{ form.submitError }}
      </b-alert>
    </div>
    <div v-if="resultRecipes.length > 0" class="centeredDiv">
      <b-button-group>
        <b-button @click="sortByTime" variant="outline-primary">Sort By Time</b-button>
        <b-button @click="sortByLikes" variant="outline-primary">Sort By Likes</b-button>
      </b-button-group>
      <RecipePreviewList title="Result Recipes" :class="{
        center: true
      }" :recipes="resultRecipes"></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import { apiSearchRecipes, apiSetSearchLimit } from "../api_calls.js";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { required } from "vuelidate/lib/validators";
import { cuisines, diets, intolerances } from "../assets/searchConsts.js";

export default {
  name: "Search",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        searchQuery: "",
        cuisines: [],
        diets: [],
        intolerances: [],
        searchLimit: this.$store.lastSearch,
        submitError: undefined
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      resultRecipes: [],
      lastSearch: this.$store.searchLimit
    }
  },
  validations: {
    form: {
      searchQuery: {
        required
      },
      searchLimit: {
        required,
        inculdeIn(value) {
          return ["5", "10", "15"].includes(value);
        }
      }
    }
  },
  computed: {
    searchLimitOptions() {
      return [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ];
    }
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onSearch() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.form.submitError = undefined;
      this.resultRecipes = [];
      this.$store.dispatch("updateLastSearch", this.form.searchQuery)
      this.lastSearch = this.form.searchQuery;
      await apiSetSearchLimit(parseInt(this.form.searchLimit));
      const { searchQuery, cuisines, diets, intolerances } = this.form;
      const response = await apiSearchRecipes(searchQuery, cuisines, diets, intolerances);
      if (!response) {
        this.form.submitError = "Server error";
      } else if (response.status === 204) {
        this.form.submitError = "No results found";
      } else if (response.status !== 200) {
        this.form.submitError = response.data.message;
      } else if (response.status === 200) {
        this.resultRecipes.push(...response.data);
      }
    },
    onReset() {
      this.form = {
        searchQuery: "",
        cuisines: [],
        diets: [],
        intolerances: [],
        searchLimit: this.$store.lastSearch,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sortByTime() {
      this.resultRecipes.sort((a, b) => {
        return a.readyInMinutes - b.readyInMinutes;
      })
    },
    sortByLikes() {
      this.resultRecipes.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
  margin: 0 auto;
}

.centeredDiv {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>