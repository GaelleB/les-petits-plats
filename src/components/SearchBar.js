import React, { useState } from "react";

function SearchBar({ recipes, setRecipes }) {
    const [query, setQuery] = useState("");

    function handleSearch(e) {
        const inputValue = e.target.value.toLowerCase();
        setQuery(inputValue);

        // On ne lance la recherche qu’à partir de 3 caractères
        if (inputValue.length < 3) {
            setRecipes(recipes);
            return;
        }

        const filteredRecipes = [];

        // 🔁 Boucles natives pour filtrer
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const title = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();

            // Vérifie si le mot est dans le titre ou la description
            if (title.includes(inputValue) || description.includes(inputValue)) {
                filteredRecipes.push(recipe);
                continue;
            }

            // Vérifie les ingrédients
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                if (ingredient.includes(inputValue)) {
                filteredRecipes.push(recipe);
                break;
                }
            }
        }

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