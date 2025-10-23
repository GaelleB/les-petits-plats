import React, { useState, useEffect } from "react";
import recipesData from "./data/recipes";
import SearchBar from "./components/SearchBar";
import TagFilters from "./components/TagFilters";
import RecipeList from "./components/RecipeList";
import "./styles.css";

function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);

  // 🔁 Filtrage combiné : recherche + tags
  useEffect(() => {
    let filtered = recipesData;

    // 1️⃣ Recherche principale (champ texte)
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

    // 2️⃣ Filtrage par tags (intersection)
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

  // 🔹 Gestion ajout de tag
  function handleAddTag(value, type) {
    if (!value) return;
    const newTag = { value: value.toLowerCase(), type };
    if (!tags.some((t) => t.value === newTag.value)) {
      setTags([...tags, newTag]);
    }
  }

  // 🔹 Suppression d’un tag
  function handleRemoveTag(value) {
    setTags(tags.filter((t) => t.value !== value));
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

      <TagFilters recipes={recipesData} onAddTag={handleAddTag} />
      <main>
        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}

export default App;