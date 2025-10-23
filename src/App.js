import React, { useState } from "react";
import recipesData from "./data/recipes";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import "./styles.css";

function App() {
  const [recipes] = useState(recipesData);

  return (
    <div className="app-container">
      <header>
        <h1>Les Petits Plats</h1>
        <SearchBar />
      </header>
      <main>
        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}

export default App;