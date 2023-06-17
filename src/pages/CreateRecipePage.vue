<template>
  <div class="container">
    <h1 class="title">Create Recipe Page</h1>
    <b-form @submit.prevent="onCreate" @reset.prevent="onReset">
      <b-form-group id="input-group-title" label-cols-sm="3" label="Title:" label-for="title">
        <b-form-input id="title" v-model="$v.form.title.$model" type="text"
          :state="validateState('title')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.title.required">
          title is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-image_url" label-cols-sm="3" label="Image URL:" label-for="image_url">
        <b-form-input id="image_url" v-model="$v.form.image_url.$model" type="text"
          :state="validateState('image_url')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.image_url.required">
          image url is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-readyInMinutes" label-cols-sm="3" label="Ready In Minutes:"
        label-for="readyInMinutes">
        <b-form-input id="readyInMinutes" v-model="$v.form.readyInMinutes.$model" type="number"
          :state="validateState('readyInMinutes')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
          readyInMinutes is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-vegetarian" label-cols-sm="3" label="Vegetarian:" label-for="vegetarian">
        <b-form-checkbox id="vegetarian" v-model="$v.form.vegetarian.$model" name="check-button" switch />
      </b-form-group>

      <b-form-group id="input-group-vegan" label-cols-sm="3" label="Vegan:" label-for="vegan">
        <b-form-checkbox id="vegan" v-model="$v.form.vegan.$model" name="check-button" switch />
      </b-form-group>

      <b-form-group id="input-group-glutenFree" label-cols-sm="3" label="Gluten Free:" label-for="glutenFree">
        <b-form-checkbox id="glutenFree" v-model="$v.form.glutenFree.$model" name="check-button" switch />
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Search</b-button>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Search failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { apiCreateNewRecipe } from "../api_calls.js";
import { required, integer } from "vuelidate/lib/validators";

export default {
  name: "CreateRecipePage",
  data() {
    return {
      form: {
        title: "",
        image_url: "",
        readyInMinutes: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
      },
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      image_url: {
        required
      },
      readyInMinutes: {
        required,
        integer
      },
      vegetarian: {
        required
      },
      vegan: {
        required
      },
      glutenFree: {
        required
      },
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onCreate() {
      this.resultRecipes = [];
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      let { title, image_url, readyInMinutes, vegetarian, vegan, glutenFree } = this.form;
      readyInMinutes = parseInt(readyInMinutes);
      const response = await apiCreateNewRecipe(title, image_url, readyInMinutes, vegetarian, vegan, glutenFree);
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
</style>
  