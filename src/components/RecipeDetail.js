import React from "react";

function RecipeDetail({ recipe, onBack }) {
    if (!recipe) return null;

    return (
        <div className="recipe-detail">
        <button className="back-btn" onClick={onBack}>← Retour</button>

        <h2>{recipe.name}</h2>
        <p><strong>Temps :</strong> {recipe.time} min</p>

        <h3>Ingrédients</h3>
        <ul>
            {recipe.ingredients.map((item, index) => (
            <li key={index}>
                <strong>{item.ingredient}</strong>
                {item.quantity && ` : ${item.quantity}`}
                {item.unit && ` ${item.unit}`}
            </li>
            ))}
        </ul>

        <h3>Description</h3>
        <p>{recipe.description}</p>

        <h3>Appareil</h3>
        <p>{recipe.appliance}</p>

        <h3>Ustensiles</h3>
        <ul>
            {recipe.ustensils.map((u, index) => (
            <li key={index}>{u}</li>
            ))}
        </ul>
        </div>
    );
}

export default RecipeDetail;