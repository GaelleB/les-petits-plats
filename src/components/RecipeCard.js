import React from "react";

function RecipeCard({ recipe, onSelect }) {
    return (
        <div className="recipe-card" onClick={() => onSelect(recipe)}>
            <div className="recipe-card-image"></div>
            <div className="recipe-card-content">
                <h2>{recipe.name}</h2>
                <p><strong>Temps :</strong> {recipe.time} min</p>
                <p>{recipe.description.slice(0, 100)}...</p>
            </div>
        </div>
    );
}

export default RecipeCard;