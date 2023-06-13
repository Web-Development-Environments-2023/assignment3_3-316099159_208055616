const server_domain = "http://localhost:3000"
import axios from "axios";

export async function apiRegister(username, first_name, last_name, country, password, email) {
  try {
    const response = await axios.post(
    server_domain + "/Register",
    {
      username: username,
      first_name: first_name,
      last_name: last_name,
      country: country,
      password: password,
      email: email,
    },
    { withCredentials: true }
    );
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiLogin(username, password) {
  try {
    const response = await axios.post(
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

export async function apiLogout() {
  try {
    const response = await axios.post(
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

/*
gets recipes of user according to attribute
attribute can be: lastWatched, favorites, myRecipes
*/
export async function apiGenericGetUsersRecipes(attribute) {
  let url = server_domain + "/users/";
  if(attribute === "favorites") {
    url += "favorites";
  }
  else if (attribute === "lastWatched") {
    url += "lastWatched";
  }
  else if (attribute === "myRecipes") {
    url += "myRecipes";
  }
  else {
    console.log("apiGenericGetUsersRecipes: invalid attribute")
    return
  }
  try {
    const response = await axios.get(
    url, 
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

/*
adds recipe to user according to attribute
attribute can be: lastWatched, favorites, myRecipes
*/
export async function apiGenericAddToUseresRecipes(attribute, recipe_id) {
  let url = server_domain + "/users/";
  if(attribute === "favorites") {
    url += "favorites";
  }
  else if (attribute === "lastWatched") {
    url += "lastWatched";
  }
  else if (attribute === "myRecipes") {
    url += "myRecipes";
  }
  else {
    console.log("apiGenericAddToUsersRecipes: invalid attribute")
    return
  }
  try {
    const response = await axios.put(
    url, 
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

export async function apiGetSearchLimit() {
  try {
    const response = await axios.get(
    server_domain + "/users/searchLimit", 
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

export async function apiSetSearchLimit(searchLimit) {
  try {
    const response = await axios.put(
    server_domain + "/users/searchLimit", 
    { searchLimit: searchLimit }, 
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

export async function apiCreateNewRecipe(recipe_data) {
  try {
    const response = await axios.post(
      server_domain + `/recipes/`,
      { recipe_data: recipe_data },
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
    const response = await axios.get(
    server_domain + `/recipes/${recipe_id}`,
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

export async function apiGet3RandomRecipes() {
  try {
    const response = await axios.get(
      server_domain + `/recipes/random`,
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

export async function apiSearchRecipes(search_data) {
  try {
    const response = await axios.get(
      server_domain + `/recipes/search`,
      {search_data: search_data},
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