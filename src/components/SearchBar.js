import React, { useState } from "react";

function SearchBar({ recipes, setRecipes }) {
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        const inputValue = e.target.value.toLowerCase();
        setQuery(inputValue);

        // Si moins de 3 caractères, on affiche tout
        if (inputValue.length < 3) {
        setRecipes(recipes);
        return;
        }

        const filteredRecipes = recipes.filter((recipe) => {
        const titleMatch = recipe.name.toLowerCase().includes(inputValue);
        const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);

        const ingredientMatch = recipe.ingredients.some((item) =>
            item.ingredient.toLowerCase().includes(inputValue)
        );

        return titleMatch || descriptionMatch || ingredientMatch;
        });

        setRecipes(filteredRecipes);
    }

    return (
        <div className="search-bar">
        <input
            type="text"
            placeholder="Rechercher une recette, un ingrédient ou une description..."
            value={query}
            onChange={handleSearch}
        />
        </div>
    );
}

export default SearchBar;