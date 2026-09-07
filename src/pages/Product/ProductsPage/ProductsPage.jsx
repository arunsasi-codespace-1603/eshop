import "./ProductsPage.scss";
// core library
import { useState, useEffect } from "react";
import { useParams } from "react-router"
// Data
import productsData from "../../../data/allProducts.json";
import categoriesData from "../../../data/category.json";
// components binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import Footer from "../../../components/ui/Footer/Footer";
import ProductSubNavigation from "../../../components/product/ProductSubNavigation/ProductSubNavigation";
import CategoryBanner from "../../../components/product/CategoryBanner/CategoryBanner";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";
import PageNotFound from "../../PageNotFound/PageNotFound";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import SortFilter from "../../../components/product/SortFilter/SortFilter";

const ProductsPage = () => {
    const {
        category,
        subCategory,
        type
    } = useParams();
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

    useEffect(() => {
        const emptyFilters = {
            colors: [],
            sizes: [],
            price: ""
        };

        setFilterBy(emptyFilters);
        setAppliedFilters(emptyFilters);
        setSortBy("default");
        setAppliedSortBy("default");
    }, [category, subCategory, type]);


    const hasActiveFilterOrSort = () => {
        return (
            filterBy.colors.length > 0 ||
            filterBy.sizes.length > 0 ||
            filterBy.price !== "" ||
            sortBy !== "default"
        );
    };
    // ------------------------------------------
    // FInd Category
    // ------------------------------------------
    const categoryList = categoriesData.categories.find((categ) => {
        return categ.slug === category;
    });
    if (!categoryList) {
        return <PageNotFound message="Sory Invalid Category" />
    }

    // ------------------------------------------
    // Find Subcategory
    // ------------------------------------------
    let subCateg = null;
    if (categoryList) {
        subCateg = categoryList.children.find((item) => {
            return item.slug === subCategory;
        });
    }
    // Get the values of subcategory to make product submenu
    let categoryNavigation = [];
    if (!subCateg) {
        return <PageNotFound message="Sorry, invalid subcategory" />;
    } else {
        categoryNavigation = subCateg.children || [];
    }

    // ------------------------------------------
    // Get products by category
    // ------------------------------------------
    let filteredProducts = productsData.products.filter((product) => {
        return (
            product.category === category &&
            (!subCategory || product.subCategory === subCategory) &&
            (!type || product.type === type)
        )
    });

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
    // Filter Products
    // ------------------------------------------
    // Filters products based on selected values.
    // Works with different product properties such as:
    // - Color → variants / colorFilter
    // - Size  → sizes / value
    // ------------------------------------------
    const filterProducts = (
        products,
        selectedValues,
        productProperty,
        itemProperty
    ) => {
        if (selectedValues.length === 0) {
            return products
        }
        return products.filter((product) => {

            // Used to determine whether the product matches
            // at least one of the selected values.
            let isMatch = false;
            const items = product[productProperty] || [];
            // Get the items we want to check.
            // Example: product.variants or product.sizes
            for (let item of items) {

                // Compare the item's property with
                // each value selected by the user.
                for (let selectedValue of selectedValues) {
                    if (item[itemProperty] === selectedValue) {
                        isMatch = true;
                        break;
                    }
                }

                // Stop checking once a match is found.
                if (isMatch) {
                    break;
                }
            }

            // Keep the product if a matching value was found.
            return isMatch;
        });
    };

    // ------------------------------------------
    // Filter Products by Price
    // ------------------------------------------
    const filterPrice = (
        products,
        selectedPrice
    ) => {
        if (selectedPrice === "") {
            return products
        }
        const priceRange = selectedPrice.split("-").map(Number);
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];
        return products.filter((product) => {
            if (product.price >= minPrice && product.price <= maxPrice) {
                return true
            }
            return false;
        })
    };

    // ------------------------------------------
    // Product Pipeline
    // ------------------------------------------
    // Filter Color
    filteredProducts = filterProducts(
        filteredProducts,
        appliedFilters.colors,
        "variants",
        "colorFilter"
    );

    // Filter Size
    filteredProducts = filterProducts(
        filteredProducts,
        appliedFilters.sizes,
        "sizes",
        "value"
    );

    // Filter Price
    filteredProducts = filterPrice(
        filteredProducts,
        appliedFilters.price
    );

    // ------------------------------------------
    // Sorting
    // ------------------------------------------
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
    // Apply Filter
    // ------------------------------------------
    const applyFilter = () => {
        setAppliedFilters(filterBy);
        setAppliedSortBy(sortBy);
        closeFilterDrawer();
    };

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

    return (
        <div>
            <Navigation />
            <main>
                {(categoryNavigation.length > 0) &&
                    <ProductSubNavigation
                        category={category}
                        subCategory={subCategory}
                        navigation={categoryNavigation} />
                }

                <section className="section-category">
                    <CategoryBanner
                        imageSource={subCateg?.bannerImage}
                        imageTitle={subCateg?.name} />
                </section>
                <div className="container-fluid">
                    <div className="product-quantity-block">
                        {filteredProducts.length.toString().padStart(2, "0")} Products
                    </div>
                </div>

                <section className="section-content">
                    <div className="container-fluid">
                        <div className="row">

                            {(filteredProducts.length === 0) &&
                                <EmptyState />
                            }

                            {(filteredProducts.length > 0 && (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="grid-column">
                                        <ProductCard
                                            productData={product} />
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>


                    <button className="btn btn--primary cta-filter" onClick={openFilterDrawer}>
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
        </div>
    )
}
export default ProductsPage