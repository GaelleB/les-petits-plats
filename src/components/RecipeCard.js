import React from "react";

function RecipeCard({ recipe, onSelect }) {
    return (
        <div className="recipe-card" onClick={() => onSelect(recipe)}>
            <h2>{recipe.name}</h2>
            <p><strong>Temps :</strong> {recipe.time} min</p>
            <p>{recipe.description.slice(0, 100)}...</p>
        </div>
    );
}

export default RecipeCard;