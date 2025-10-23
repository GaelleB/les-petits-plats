import React, { useState, useEffect } from "react";
import recipesData from "./data/recipes";
import SearchBar from "./components/SearchBar";
import TagFilters from "./components/TagFilters";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./styles.css";

function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // 🆕 fiche active

  // 🔁 Filtrage combiné (déjà en place)
  useEffect(() => {
    let filtered = recipesData;

    if (query.length >= 3) {
      filtered = filtered.filter((recipe) => {
        const term = query.toLowerCase();
        return (
          recipe.name.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          recipe.ingredients.some((i) =>
            i.ingredient.toLowerCase().includes(term)
          )
        );
      });
    }

    tags.forEach((tag) => {
      if (tag.type === "ingredient") {
        filtered = filtered.filter((recipe) =>
          recipe.ingredients.some(
            (i) => i.ingredient.toLowerCase() === tag.value
          )
        );
      }
      if (tag.type === "ustensil") {
        filtered = filtered.filter((recipe) =>
          recipe.ustensils.some((u) => u.toLowerCase() === tag.value)
        );
      }
      if (tag.type === "appliance") {
        filtered = filtered.filter(
          (recipe) => recipe.appliance.toLowerCase() === tag.value
        );
      }
    });

    setRecipes(filtered);
  }, [query, tags]);

  // 🔹 Tags
  function handleAddTag(value, type) {
    if (!value) return;
    const newTag = { value: value.toLowerCase(), type };
    if (!tags.some((t) => t.value === newTag.value)) {
      setTags([...tags, newTag]);
    }
  }

  function handleRemoveTag(value) {
    setTags(tags.filter((t) => t.value !== value));
  }

  // 🔹 Navigation entre liste et fiche
  function handleSelectRecipe(recipe) {
    setSelectedRecipe(recipe);
  }

  function handleBack() {
    setSelectedRecipe(null);
  }

  return (
    <div className="app-container">
      <header>
        <h1>Les Petits Plats</h1>
        <SearchBar
          recipes={recipesData}
          setRecipes={setRecipes}
          setQuery={setQuery}
        />
        <div className="active-tags">
          {tags.map((tag) => (
            <span key={tag.value} className={`tag ${tag.type}`}>
              {tag.value}
              <button onClick={() => handleRemoveTag(tag.value)}>×</button>
            </span>
          ))}
        </div>
      </header>

      <TagFilters recipes={recipes} onAddTag={handleAddTag} />

      <main>
        {selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />
        ) : (
          <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;