import "./SearchResultsPage.scss";

// React Core
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Data
import productList from "../../../data/allProducts.json";

// Utility Services
import filterProduct from "../../../utils/filterProduct";
import sortProduct from "../../../utils/sortProduct";

// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import Footer from "../../../components/ui/Footer/Footer";
import SearchResultList from "../SearchResultList/SearchResultList";
import ProductFilters from "../../ProductFilters/ProductFilters";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";
import ProductNotFound from "../../../pages/ProductNotFound/ProductNotFound";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";

const SearchResultsPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // -----------------------------------------
    // Filter State
    // -----------------------------------------

    const [filters, setFilters] = useState({
        colors: [],
        sizes: [],
        priceRange: ""
    });

    const [appliedFilters, setAppliedFilters] = useState({
        colors: [],
        sizes: [],
        priceRange: ""
    });

    const [sortOption, setSortOption] = useState({
        value: "newest-first"
    });

    // -----------------------------------------
    // Get Search Query
    // -----------------------------------------

    const [searchParams] = useSearchParams();

    const queryString = searchParams.get("q");
    const searchQuery = queryString?.trim().toLowerCase() || "";

    // -----------------------------------------
    // Invalid / Empty Search
    // -----------------------------------------

    if (!searchQuery) {
        return <PageNotFound />;
    }

    // -----------------------------------------
    // Search Words
    // -----------------------------------------

    const searchWords = searchQuery.split(/\s+/);

    // -----------------------------------------
    // Find Search Products
    // -----------------------------------------

    const allProducts = productList.products;

    const searchResults = allProducts.filter((product) => {
        const productName = product.name.toLowerCase();

        return searchWords.every((word) =>
            productName.includes(word)
        );
    });

    // -----------------------------------------
    // No Search Results
    // -----------------------------------------

    if (searchResults.length === 0) {
        return <ProductNotFound />;
    }

    // -----------------------------------------
    // Apply Filters
    // -----------------------------------------

    const filteredProducts = filterProduct(
        appliedFilters,
        searchResults
    );

    // -----------------------------------------
    // Apply Sort
    // -----------------------------------------

    const sortedProducts = sortProduct(
        sortOption,
        filteredProducts
    );

    // -----------------------------------------
    // Filter Panel
    // -----------------------------------------

    const openFilterPanel = () => {
        setIsFilterOpen(true);
    };

    const closeFilterPanel = () => {
        setIsFilterOpen(false);
    };

    // -----------------------------------------
    // Applied Filters Count
    // -----------------------------------------

    const appliedFilterCount =
        appliedFilters.colors.length +
        appliedFilters.sizes.length;

    // -----------------------------------------
    // Render
    // -----------------------------------------

    return (
        <>
            <Navigation />

            <main>
                <section className="search-banner">
                    <div className="container-fluid">
                        <h2 className="search-banner__title">
                            Search for "{queryString}"
                        </h2>

                        <div className="search-banner__count">
                            {sortedProducts.length
                                .toString()
                                .padStart(2, "0")}{" "}
                            Results
                        </div>
                    </div>
                </section>

                <section className="section-content">

                    {sortedProducts.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <SearchResultList
                            products={sortedProducts}
                        />
                    )}

                    <div className="floating-button">
                        <div className="container-fluid text-center">
                            <button
                                type="button"
                                className="btn btn--primary"
                                onClick={openFilterPanel}
                            >
                                <span>Filter and Sort </span>

                                {appliedFilterCount > 0 && (
                                    <span className="filter-count">
                                        (
                                        {String(
                                            appliedFilterCount
                                        ).padStart(2, "0")}
                                        )
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                </section>
            </main>

            <ProductFilters
                filters={filters}
                setFilters={setFilters}
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
                isFilterOpen={isFilterOpen}
                openFilterPanel={openFilterPanel}
                closeFilterPanel={closeFilterPanel}
            />

            <Footer />
        </>
    );
};

export default SearchResultsPage;

