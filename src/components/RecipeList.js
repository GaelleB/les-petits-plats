import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onSelect }) {
    if (recipes.length === 0) {
        return (
            <p className="no-results">
                Aucune recette ne correspond à votre critère…<br />
                Vous pouvez essayer “tarte aux pommes”, “poisson”, etc.
            </p>
        );
    }

    return (
        <div className="recipes-grid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelect} />
            ))}
        </div>
    );
}

export default RecipeList;