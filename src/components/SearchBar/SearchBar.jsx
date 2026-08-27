import "./SearchBar.scss";

// React Core
import { Link } from "react-router";
import { useState } from "react";
// Icons
import { XLg, Search } from "react-bootstrap-icons";
// Componet Binding
import SearchSuggestions from "./SearchSuggestions/SearchSuggestions";
import QuickLinks from "./QuickLinks/QuickLinks";
// Data
import productsData from "../../data/allProducts.json";

const SearchBar = ({
    isActive,
    closeSearch
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // All products
    const allProducts = productsData.products;

    //------------------------------------------------
    // Search
    //------------------------------------------------
    // Search query
    const query = searchQuery.trim().toLowerCase();
    let filteredProducts = [];

    // Filtered Products
    if (query !== "") {
        const searchWords = query.split(/\s+/);
        filteredProducts = allProducts.filter((product) => {
            const productName = product.name.toLowerCase();

            return searchWords.every((word) => {
                return productName.includes(word);
            });
        });
    }

    // Only show first 4 products in search overlay
    const suggestedProducts = filteredProducts.slice(0, 4);
    const searchResultCount = filteredProducts.length;

    //------------------------------------------------
    // Submit form
    //------------------------------------------------
    const handleSearch = (event) => {
        event.preventDefault();
    }

    //------------------------------------------------
    // Handle close search
    //------------------------------------------------
    const handleCloseSearch = () => {
        setSearchQuery("");
        closeSearch();
    };

    return (
        <>
            <div className={`search-wrapper  ${isActive ? "is-active" : ""}`}>

                <div className="search-wrapper__header">
                    <button
                        onClick={handleCloseSearch}
                        className="btn cta-button-close">
                        <XLg />
                        <span>Close</span>
                    </button>
                </div>

                <div className="search-wrapper__body">
                    <form
                        onSubmit={handleSearch}
                        className="form-search">
                        <div className="form-search__group mb-3">
                            <div className="form-search__prepend">
                                <button className="icon"><Search /></button>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="What are you looking for..."
                                    className="form-search__input input-field" />
                            </div>
                        </div>
                    </form>
                    <div className="quick-suggestion">
                        Search for <button className="btn btn-borderless">Random</button> products
                    </div>

                    {query === "" && (
                        <QuickLinks />

                    )}

                    {query !== "" && filteredProducts.length > 0 && (
                        <SearchSuggestions
                            products={suggestedProducts}
                            totalCount={searchResultCount}
                        />
                    )}

                    {query !== "" && filteredProducts.length === 0 && (
                        <div>Sorry – there are no results for your search "{query}". Please try again:</div>
                    )}
                </div>

            </div>
            <div
                onClick={handleCloseSearch}
                className={`search-wrapper-backdrop  ${isActive ? "is-active" : ""}`} />
        </>
    )
}
export default SearchBar