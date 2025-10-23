/**
 * Filtre les recettes selon la recherche principale et les tags actifs.
 * @param {Array} recipesData - Toutes les recettes disponibles
 * @param {string} query - Texte saisi dans la barre de recherche
 * @param {Array} tags - Liste des tags actifs (value + type)
 * @returns {Array} - Recettes filtrées
 */

export function filterRecipes(recipesData, query, tags) {
    let filtered = recipesData;

    // 🔍 Recherche principale
    if (query.length >= 3) {
        const term = query.toLowerCase();
        filtered = filtered.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            recipe.ingredients.some((i) =>
            i.ingredient.toLowerCase().includes(term)
            )
        );
        });
    }

    // 🏷️ Filtres par tags (intersection stricte)
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

    // 🚫 Évite les doublons
    return filtered.filter(
        (item, index, self) => index === self.findIndex((r) => r.id === item.id)
    );
}