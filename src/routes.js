import Main from "./pages/MainPage";
import About from "./pages/AboutPage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Search from "./pages/SearchPage";
import RecipeViewPage from "./pages/RecipeViewPage";
import FamilyRecipesPage from "./pages/FamilyRecipesPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: RecipeViewPage,
  },
  {
    path: "/favoriteRecipes",
    name: "favoriteRecipes",
    component: FavoriteRecipesPage,
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: MyRecipesPage,
  },
  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: FamilyRecipesPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
