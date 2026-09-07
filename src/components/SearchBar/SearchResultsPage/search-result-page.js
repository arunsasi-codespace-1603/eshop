import "./SearchResultsPage.scss";

// React Core
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// Data
import productList from "../../../data/allProducts.json";
// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import Footer from "../../../components/ui/Footer/Footer";
import SearchResultList from "../SearchResultList/SearchResultList";
import SortFilter from "../../product/SortFilter/SortFilter";
// Utilities
import { filterProducts, filterPrice } from "../../../utils/productFilters";
import EmptyState from "../../ui/EmptyState/EmptyState";

const SearchResultsPage = () => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [appliedSortBy, setAppliedSortBy] = useState("default");
    const [filterBy, setFilterBy] = useState({
        colors: [],
        sizes: [],
        price: ""
    });
    const [appliedFilters, setAppliedFilters] = useState({
        colors: [],
        sizes: [],
        price: ""
    });

    const hasActiveFilterOrSort = () => {
        return (
            filterBy.colors.length > 0 ||
            filterBy.sizes.length > 0 ||
            filterBy.price !== "" ||
            sortBy !== "default"
        );
    };

    // ------------------------------------------
    // Open Filter Drawer
    // ------------------------------------------
    const openFilterDrawer = () => {
        setIsFilterOpen(true);
    }

    // ------------------------------------------
    // Close Filter Drawer
    // ------------------------------------------
    const closeFilterDrawer = () => {
        setIsFilterOpen(false);
    }

    // ------------------------------------------
    // Reset Filter Values
    // ------------------------------------------
    const resetFilter = () => {
        const emptyFilters = {
            colors: [],
            sizes: [],
            price: ""
        };

        setSortBy("default");
        setAppliedSortBy("default");
        setFilterBy(emptyFilters);
        setAppliedFilters(emptyFilters);
    }

    // ------------------------------------------
    // Apply Filter
    // ------------------------------------------
    const applyFilter = () => {
        setAppliedFilters(filterBy);
        setAppliedSortBy(sortBy);
        closeFilterDrawer();
    };


    //------------------------------------------------
    // Get search query 
    //------------------------------------------------
    const [searchParams] = useSearchParams();
    const queryString = searchParams.get("q");
    const searchQuery = queryString?.trim().toLowerCase() || "";
    const searchWords = searchQuery
        ? searchQuery.split(/\s+/)
        : [];

    //------------------------------------------------
    // Find search products
    //------------------------------------------------
    const allProducts = productList.products;
    const searchResults = allProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const matchesSearch = searchWords.every((word) => {
            return productName.includes(word);
        });

        return matchesSearch;
    });
    const searchResultCount = searchResults.length;
    let filteredProducts = searchResults;
    filteredProducts = filterProducts(
        filteredProducts,
        appliedFilters.colors,
        "variants",
        "colorFilter"
    );

    filteredProducts = filterProducts(
        filteredProducts,
        appliedFilters.sizes,
        "sizes",
        "value"
    );

    filteredProducts = filterPrice(
        filteredProducts,
        appliedFilters.price
    );
    switch (appliedSortBy) {
        case "newest":
            filteredProducts = [...filteredProducts].sort(
                (a, b) => b.id - a.id
            );
            break;

        case "price-asc":
            filteredProducts = [...filteredProducts].sort(
                (a, b) => a.price - b.price
            );
            break;

        case "price-desc":
            filteredProducts = [...filteredProducts].sort(
                (a, b) => b.price - a.price
            );
            break;

        default:
            break;
    }

    // ------------------------------------------
    // Get filter count
    // ------------------------------------------
    const getFilterSortCount = () => {
        return (
            appliedFilters.colors.length +
            appliedFilters.sizes.length +
            (appliedFilters.price !== "" ? 1 : 0) +
            (appliedSortBy !== "default" ? 1 : 0)
        );
    };

    // ------------------------------------------
    // If no products found
    // ------------------------------------------
    if (filteredProducts.length === 0) {
        return <EmptyState />
    }

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
                            {filteredProducts.length.toString().padStart(2, "0")} Results
                        </div>
                    </div>
                </section>

                <section className="section-content">
                    <SearchResultList products={filteredProducts} />

                    <button
                        onClick={openFilterDrawer}
                        className="btn btn--primary cta-filter">
                        <span>FIlter and Sort </span>
                        {getFilterSortCount() > 0 &&
                            <span>({getFilterSortCount()})</span>
                        }
                    </button>
                </section>


                <SortFilter
                    isFilterOpen={isFilterOpen}
                    onClose={closeFilterDrawer}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    filterBy={filterBy}
                    onFilterChange={setFilterBy}
                    actionReset={resetFilter}
                    onApply={applyFilter}
                    hasActiveFilterOrSort={hasActiveFilterOrSort}
                />

            </main>
            <Footer />
        </>
    )
}
export default SearchResultsPage;