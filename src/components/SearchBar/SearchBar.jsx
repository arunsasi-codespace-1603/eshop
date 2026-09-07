import "./SearchBar.scss";

// React Core
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import { XLg, Search, ArrowRight, ChevronRight } from "react-bootstrap-icons";
// Componet Binding
import SearchSuggestions from "./SearchSuggestions/SearchSuggestions";
import QuickLinks from "./QuickLinks/QuickLinks";
// Data
import productsData from "../../data/allProducts.json";

const SearchBar = ({
    isActive,
    closeSearch
}) => {
    const navigate = useNavigate();
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
    const suggestedProducts = filteredProducts;

    //------------------------------------------------
    // Submit form
    //------------------------------------------------
    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;
        handleCloseSearch();
        navigate(`/search?q=${encodeURIComponent(query)}`);
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
                                <button
                                    type="button"
                                    className="btn btn-search-icon">
                                    <Search />
                                </button>

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="What are you looking for..."
                                    className="form-search__input input-field" />

                                {query !== "" &&
                                    <button
                                        type="button"
                                        className="btn btn-submit-search"
                                    >
                                        <ChevronRight />
                                    </button>
                                }
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
                            query={searchQuery}
                            closeSearch={handleCloseSearch} />
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