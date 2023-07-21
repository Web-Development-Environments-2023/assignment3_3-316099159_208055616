const server_domain = "https://132.73.84.130"
import axios from "axios";

export async function apiRegister(username, firstname, lastname, country, password, email) {
  try {
    const response = await axios.post(
    server_domain + "/Register",
    {
      username: username,
      firstname: firstname,
      lastname: lastname,
      country: country,
      password: password,
      email: email,
    },
    { withCredentials: true }
    );
    console.log("apiRegister");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiRegister");
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
    console.log("apiLogin");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiLogin");
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
    {},
    { withCredentials: true }
    );
    console.log("apiLogout");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiLogout");
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
    console.log("apiGenericGetUsersRecipes " + attribute);
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiGenericGetUsersRecipes " + attribute);
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
    console.log("apiGenericAddToUsersRecipes " + attribute);
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiGenericAddToUsersRecipes " + attribute);
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
    console.log("apiGetSearchLimit");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiGetSearchLimit");
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
    console.log("apiSetSearchLimit");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiSetSearchLimit");
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiCreateNewRecipe(title, image_url, readyInMinutes, vegetarian, vegan, glutenFree) {
  try {
    const response = await axios.post(
      server_domain + `/recipes/`,
      { 
        title: title,
        image: image_url,
        readyInMinutes: readyInMinutes,
        vegetarian: vegetarian,
        vegan: vegan,
        glutenFree: glutenFree 
      },
      { withCredentials: true }
    );
    console.log("apiCreateNewRecipe");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiCreateNewRecipe");
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
    console.log("apiGetRecipeById");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiGetRecipeById");
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
    console.log("apiGet3RandomRecipes");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiGet3RandomRecipes");
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}

export async function apiSearchRecipes(searchQuery, cuisines, diets, intolerances) {
  try {
    const response = await axios.get(
      server_domain + `/recipes/search`,
      { withCredentials: true ,
        headers: 
        {
          text: searchQuery, 
          cuisines: cuisines, 
          diets: diets, 
          intolerances: intolerances
        } 
      },
    );
    console.log("apiSearchRecipes");
    console.log(response);
    return response;
  } catch (err) {
    console.log("apiSearchRecipes");
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return
  }
}