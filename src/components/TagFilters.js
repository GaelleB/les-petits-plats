import React from "react";

function TagFilters({ recipes, onAddTag }) {
    const ingredients = [...new Set(recipes.flatMap(r => r.ingredients.map(i => i.ingredient.toLowerCase())))];
    const ustensiles = [...new Set(recipes.flatMap(r => r.ustensils.map(u => u.toLowerCase())))];
    const appareils = [...new Set(recipes.map(r => r.appliance.toLowerCase()))];

    return (
        <div className="filters">
        <div className="filter-wrapper filter-ingredients">
            <select className="filter-select" onChange={(e) => onAddTag(e.target.value, "ingredient")}>
                <option value="">Ingrédients</option>
                {ingredients.map((i) => (
                <option key={i}>{i}</option>
                ))}
            </select>
        </div>

        <div className="filter-wrapper filter-ustensils">
            <select className="filter-select" onChange={(e) => onAddTag(e.target.value, "ustensil")}>
                <option value="">Ustensiles</option>
                {ustensiles.map((u) => (
                <option key={u}>{u}</option>
                ))}
            </select>
        </div>

        <div className="filter-wrapper filter-appliance">
            <select className="filter-select" onChange={(e) => onAddTag(e.target.value, "appliance")}>
                <option value="">Appareils</option>
                {appareils.map((a) => (
                <option key={a}>{a}</option>
                ))}
            </select>
        </div>
        </div>
    );
}

export default TagFilters;