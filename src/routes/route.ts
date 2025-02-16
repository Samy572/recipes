import { Hono } from "hono";
import { recipeController } from "../controllers/recipes.js";

const routeRecipe = new Hono();

routeRecipe.post("/", recipeController);

export default routeRecipe;