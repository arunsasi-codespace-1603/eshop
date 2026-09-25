import "./CollectionList.scss";

// Core React
import { useParams } from "react-router";
import { useState } from "react";

// Data
import collectionList from "../../../data/collection.json";
import productData from "../../../data/allProducts.json";

// Utility services
import filterProduct from "../../../utils/filterProduct";
import sortProduct from "../../../utils/sortProduct";

// Utility functions
import ProductFilters from "../../ProductFilters/ProductFilters";

// Component Binding
import Navigation from "../../ui/Navigation/Navigation";
import Footer from "../../ui/Footer/Footer";
import EmptyState from "../../ui/EmptyState/EmptyState";
import ProductCard from "../../ui/ProductCard/ProductCard";
import CollectionEmptyState from "../CollectionEmptyState/CollectionEmptyState";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";


const CollectionList = () => {
    const { gender, collectionName } = useParams();

    const allCollections = collectionList.collections;
    const allProducts = productData.products;

    //------------------------------------------------
    // Get collection
    //------------------------------------------------

    const collection = allCollections.find((collection) => {
        return (
            collection.gender === gender &&
            collection.id === collectionName
        );
    });

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

    //------------------------------------------------
    // Get products by collection
    //------------------------------------------------

    const productsByCollection = collection
        ? allProducts.filter((product) => {
            return (
                product.collection === collectionName &&
                product.category === gender
            );
        })
        : [];

    //-----------------------------------------
    // Apply Filters
    //-----------------------------------------

    const filteredProducts = filterProduct(
        appliedFilters,
        productsByCollection
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
    //  Collection does not exist
    //-----------------------------------------
    if (!collection) {
        return <PageNotFound />;
    }


    return (
        <>
            <Navigation />

            <main>
                {/* -----------------------------------------
                    Collection exists
                ----------------------------------------- */}

                {collection && (
                    <>
                        {/* Collection Banner */}
                        <section className="collection-banner">
                            <picture className="collection-banner__image">
                                <source
                                    media="(max-width: 768px)"
                                    srcSet={collection.mobileBannerImage}
                                />

                                <img
                                    src={collection.heroBannerImage}
                                    alt={collection.title}
                                />
                            </picture>

                            <div className="collection-banner__overlay">
                                <div className="collection-banner__content">

                                    <div className="collection-banner__title">
                                        {collection.title}
                                    </div>

                                    <div className="collection-banner__subtitle">
                                        {collection.subtitle}
                                    </div>

                                </div>
                            </div>
                        </section>

                        {/* -----------------------------------------
                            Products Section
                        ----------------------------------------- */}

                        <section className="section-content">

                            {/* -----------------------------------------
                                Situation 1:
                                Collection exists but has no products
                            ----------------------------------------- */}

                            {productsByCollection.length === 0 && (
                                <CollectionEmptyState />
                            )}

                            {/* -----------------------------------------
                                Situation 2:
                                Collection has products but filter
                                returned no products
                            ----------------------------------------- */}

                            {productsByCollection.length > 0 &&
                                sortedProducts.length === 0 && (
                                    <EmptyState />
                                )
                            }

                            {/* -----------------------------------------
                                Products
                            ----------------------------------------- */}

                            {sortedProducts.length > 0 && (
                                <div className="container-fluid">
                                    <div className="row">

                                        {sortedProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="grid-column"
                                            >
                                                <ProductCard
                                                    productData={product}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}

                            {/* -----------------------------------------
                                Filter and Sort Button

                                Only show when the original collection
                                has products.

                                This remains visible even when filtering
                                produces zero results.
                            ----------------------------------------- */}

                            {productsByCollection.length > 0 && (
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
                                                    {String(
                                                        appliedFilterCount
                                                    ).padStart(2, "0")}
                                                    )
                                                </span>
                                            )}
                                        </button>

                                    </div>
                                </div>
                            )}

                        </section>
                    </>
                )}

            </main>

            {/* -----------------------------------------
                Product Filters
            ----------------------------------------- */}

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

export default CollectionList;