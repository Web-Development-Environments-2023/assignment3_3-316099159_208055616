const server_domain = "http://localhost:3000"
import axios from "axios";

export async function apiLogout() {
  let response;
  try {
    response = await axios.post(
    server_domain + "/Logout",
    { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiLogin(username, password) {
  let response;
  try {
    response = await axios.post(
    server_domain + "/Login",
    {
      username: username,
      password: password,
    },
    { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiGetRandomRecipes() {
  let response;
  try {
    response = await axios.get(
      server_domain + "/recipes/random",
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiGetLastWatched() {
  let response;
  try {
    response = await axios.get(
      server_domain + "/users/lastWatched",
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiGetRecipeById(recipe_id) {
  try {
    const response = await this.axios.get(
      server_domain + `/recipes/${this.$route.params.recipeId}`,
      { recipeId: recipe_id },
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiAddToFavorites(recipe_id) {
  try {
    const response = await this.axios.put(
      server_domain + `/users/favorites`,
      { recipeId: recipe_id },
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiAddToLastWatched(recipe_id) {
  try {
    const response = await this.axios.put(
      server_domain + `/users/lastWatched`,
      { recipeId: recipe_id },
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}