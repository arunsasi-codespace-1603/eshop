const sortProduct = (sortOptions, products) => {
    // Make a copy of the products array
    const sortedProducts = [...products];
    switch (sortOptions.value) {

        // Newest products first
        case "newest-first":
            sortedProducts.sort((a, b) => {
                return b.id - a.id;
            });
            break;

        // Highest price first
        case "price-high-to-low":
            sortedProducts.sort((a, b) => {
                return b.price - a.price;
            });
            break;

        // Lowest price first
        case "price-low-to-high":
            sortedProducts.sort((a, b) => {
                return a.price - b.price;
            });
            break;

        default:
            break;
    }

    return sortedProducts;
}
export default sortProduct