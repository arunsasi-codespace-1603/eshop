import "./ProductsPage.scss";
// core library
import { useState } from "react";
import { useParams } from "react-router"
// components binding
import Navbar from "../../../components/ui/Navbar/Navbar";
import CategoryNavigation from "../../../components/product/CategoryNavigation/CategoryNavigation";
import Footer from "../../../components/ui/Footer/Footer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import ProductItems from "../../../data/product.json";
import CategoryItems from "../../../data/category.json";
import PageNotFound from "../../PageNotFound/PageNotFound";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";
import CategoryBanner from "../../../components/product/CategoryBanner/CategoryBanner";
import SortFilter from "../../../components/product/SortFilter/SortFilter";

const ProductsPage = () => {
    const { categId } = useParams();
    const categoryId = Number(categId);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("default");
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

    // ==========================================
    // Get Category
    // ==========================================
    const categoryData = CategoryItems.categories.find((category) => {
        return category.id === categoryId;
    });

    if (!categoryData) {
        return <PageNotFound message="Sory Invalid Category" />
    }
    // ==========================================
    // Get products by category
    // ==========================================
    let filteredProducts = ProductItems.products.filter((product) => {
        return product.categoryId === categoryId;
    });

    // ==========================================
    // Open Filter Drawer
    // ==========================================
    const openFilterDrawer = () => {
        setIsFilterOpen(true);
    }

    // ==========================================
    // Close Filter Drawer
    // ==========================================
    const closeFilterDrawer = () => {
        setIsFilterOpen(false);
    }

    // ==========================================
    // Reset Filter Values
    // ==========================================
    const resetFilter = () => {
        const emptyFilters = {
            colors: [],
            sizes: [],
            price: ""
        };

        setSortBy("default");
        setFilterBy(emptyFilters);
        setAppliedFilters(emptyFilters);
    }

    // ==========================================
    // Filter Products
    // ==========================================
    // Filters products based on selected values.
    // Works with different product properties such as:
    // - Color → variants / colorFilter
    // - Size  → sizes / value
    // ==========================================
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

    // ==========================================
    // Filter Products by Price
    // ==========================================
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

    // ==========================================
    // Product Pipeline
    // ==========================================
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

    // ==========================================
    // Sorting
    // ==========================================
    switch (sortBy) {
        case "newest":
            filteredProducts.sort((a, b) => b.id - a.id);
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
    // ==========================================
    // Apply Filter
    // ==========================================
    const applyFilter = () => {
        setAppliedFilters(filterBy);
        closeFilterDrawer();
    };
    return (
        <div>
            <Navbar />
            <main>
                <section className="section-category">
                    <CategoryBanner
                        imageSource={categoryData.image}
                        imageTitle={categoryData.name} />
                </section>

                <div className="container-fluid">
                    <div className="product-quantity-block">
                        {
                            filteredProducts.length.toString().padStart(2, "0")} Products
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

                    <button className="btn cta-filter" onClick={openFilterDrawer}>
                        <span>FIlter and Sort</span>
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
        </div>
    )
}
export default ProductsPage