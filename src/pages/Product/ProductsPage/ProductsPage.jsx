import "./ProductsPage.scss";

// React Core
import { useState } from "react";
import { useParams } from "react-router";

// Data
import productsList from "../../../data/allProducts.json";

// Utility services
import filterProduct from "../../../utils/filterProduct";
import sortProduct from "../../../utils/sortProduct";

// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import Footer from "../../../components/ui/Footer/Footer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import ProductFilters from "../../../components/ProductFilters/ProductFilters";
import PageNotFound from "../../PageNotFound/PageNotFound";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";

const ProductsPage = () => {
    const { category, subCategory } = useParams();

    const allProducts = productsList.products;

    //-----------------------------------------
    // State
    //-----------------------------------------

    // Controls whether the filter panel is open
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Temporary filter selections
    const [filters, setFilters] = useState({
        colors: [],
        sizes: [],
        priceRange: ""
    });

    // Filters that are actually applied
    const [appliedFilters, setAppliedFilters] = useState({
        colors: [],
        sizes: [],
        priceRange: ""
    });

    // Stores the user's selected sorting option
    const [sortOption, setSortOption] = useState({
        value: "newest-first"
    });

    //-----------------------------------------
    // Get products by category
    //-----------------------------------------

    // Get products that belong to the
    // selected category and sub-category.
    const productsByCategory = allProducts.filter((product) => {
        return (
            product.category === category &&
            product.subCategory === subCategory
        );
    });

    //-----------------------------------------
    // Invalid Category / Sub-Category
    //-----------------------------------------

    // If the selected category or sub-category
    // does not exist, show the 404 page.
    if (productsByCategory.length === 0) {
        return <PageNotFound />;
    }

    //-----------------------------------------
    // Apply Filters
    //-----------------------------------------

    const filteredProducts = filterProduct(
        appliedFilters,
        productsByCategory
    );

    //-----------------------------------------
    // Apply Sort
    //-----------------------------------------

    const sortedProducts = sortProduct(
        sortOption,
        filteredProducts
    );

    //-----------------------------------------
    // Filter Panel
    //-----------------------------------------

    // Open the filter panel
    const openFilterPanel = () => {
        setIsFilterOpen(true);
    };

    // Close the filter panel
    const closeFilterPanel = () => {
        setIsFilterOpen(false);
    };

    //-----------------------------------------
    // Applied Filters Count
    //-----------------------------------------

    const appliedFilterCount =
        appliedFilters.colors.length +
        appliedFilters.sizes.length;

    //-----------------------------------------
    // Render
    //-----------------------------------------

    return (
        <>
            <Navigation />

            <main>
                <section className="section-content">
                    <div className="container-fluid">
                        <div className="row">

                            {sortedProducts.length === 0 ? (
                                <EmptyState />
                            ) : (
                                sortedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="grid-column"
                                    >
                                        <ProductCard
                                            productData={product}
                                        />
                                    </div>
                                ))
                            )}

                        </div>
                    </div>

                    <div className="floating-button">
                        <div className="container-fluid text-center">
                            <button
                                type="button"
                                className="btn btn--primary"
                                onClick={openFilterPanel}
                            >
                                <span>
                                    Filter and Sort
                                </span>

                                {appliedFilterCount > 0 && (
                                    <span className="filter-count">
                                        (
                                        {String(appliedFilterCount).padStart(
                                            2,
                                            "0"
                                        )}
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

export default ProductsPage;