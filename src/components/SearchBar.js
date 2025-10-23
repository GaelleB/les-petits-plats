import React from "react";

function SearchBar() {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher une recette, un ingrédient, une description..."
            />
        </div>
    );
}

export default SearchBar;