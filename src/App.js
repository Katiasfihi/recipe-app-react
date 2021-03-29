import React, { useEffect, useState } from "react";
import Recipes from "./Recipes";
import "./styles.css";

const App = () => {
  const APP_ID = "556f3516";
  const APP_KEY = "993081dd939dc1d8e659c5111d46fe94";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Strawberry");
  console.log("query", query);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async (search) => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    console.log("event", e);
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    getRecipes(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />

        <button className="search-button" type="submit">
          search
        </button>
      </form>

      {recipes.map((recipe) => (
        <Recipes
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
