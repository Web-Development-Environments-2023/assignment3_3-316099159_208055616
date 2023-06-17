<template>
  <div>
    <div class="container">
      <h1 class="title">Search Page</h1>
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
        <b-form-group id="input-group-searchQuery" label-cols-sm="3" label="Query:" label-for="searchQuery">
          <b-form-input id="searchQuery" v-model="$v.form.searchQuery.$model" type="text"
            :state="validateState('searchQuery')"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.searchQuery.required">
            searchQuery is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-cuisines" label-cols-sm="3" label="Cuisines:" label-for="cuisines">
          <b-form-select id="cuisines" v-model="$v.form.cuisines.$model" :options="cuisines"
            :state="validateState('cuisines')"></b-form-select>
          <b-form-invalid-feedback>
            Cuisines is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-diets" label-cols-sm="3" label="Diets:" label-for="diets">
          <b-form-select id="diets" v-model="$v.form.diets.$model" :options="diets"
            :state="validateState('diets')"></b-form-select>
          <b-form-invalid-feedback>
            Diets is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-intolerances" label-cols-sm="3" label="Intolerances:" label-for="intolerances">
          <b-form-select id="intolerances" v-model="$v.form.intolerances.$model" :options="intolerances"
            :state="validateState('intolerances')"></b-form-select>
          <b-form-invalid-feedback>
            Intolerances is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Search</b-button>
      </b-form>
      <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
        Search failed: {{ form.submitError }}
      </b-alert>
    </div>
    <div class="resultRecipes">
      <RecipePreviewList v-if="resultRecipes.length > 0" title="Reesult Recipes" :class="{
        center: true
      }" :recipes="resultRecipes"></RecipePreviewList>
    </div>
  </div>
</template>

<script>
import { apiSearchRecipes } from "../api_calls.js";
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
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      resultRecipes: [],
    }
  },
  validations: {
    form: {
      searchQuery: {
        required
      },
      cuisines: {
        required
      },
      diets: {
        required
      },
      intolerances: {
        required
      }
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
      this.resultRecipes = [];
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const { searchQuery, cuisines, diets, intolerances } = this.form;
      const response = await apiSearchRecipes(searchQuery, cuisines, diets, intolerances);
      if (!response) {
        this.form.submitError = "Server error";
      } else if (response.status !== 200) {
        this.form.submitError = response.data.message;
      } else if (response.status === 200) {
        this.resultRecipes.push(...response.data);
      }
    },
    onReset() {
      this.form = {
        searchQuery: "",
        cuisines: null,
        diets: null,
        intolerances: null,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}

.resultRecipes {
  margin-top: 50px;
}
</style>