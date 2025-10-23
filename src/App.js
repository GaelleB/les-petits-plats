import React, { useState, useEffect } from "react";
import recipesData from "./data/recipes";
import { filterRecipes } from "./utils/filterUtils";
import SearchBar from "./components/SearchBar";
import TagFilters from "./components/TagFilters";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./styles.css";

function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🔁 Filtrage combiné (texte + tags)
  useEffect(() => {
    const filtered = filterRecipes(recipesData, query, tags);
    setRecipes(filtered);
  }, [query, tags]);

  // ➕ Ajout de tag
  function handleAddTag(value, type) {
    if (!value) return;
    const newTag = { value: value.toLowerCase(), type };
    if (!tags.some((t) => t.value === newTag.value)) {
      setTags([...tags, newTag]);
    }
  }

  // ❌ Suppression de tag
  function handleRemoveTag(value) {
    setTags(tags.filter((t) => t.value !== value));
  }

  return (
    <div className="app-container">
      <header>
        <img src="/les-petits-plats.png" alt="Les Petits Plats" className="logo" />

        <SearchBar setQuery={setQuery} />

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
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
          />
        ) : (
          <RecipeList recipes={recipes} onSelect={setSelectedRecipe} />
        )}
      </main>
    </div>
  );
}

export default App;