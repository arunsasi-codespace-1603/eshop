const filterProduct = (filter, product) => {
    // Get the selected colors and sizes from the filter state
    const { colors, sizes } = filter;

    // Filter the products based on the selected colors and sizes
    const filteredResult = product.filter((product) => {

        // -----------------------------------------
        // Check Color Match
        // -----------------------------------------
        // Check if the product has at least one
        // variant with a color selected by the user.
        const colorMatch =
            colors.length === 0 ||
            product.variants.some((variant) => {
                return colors.includes(variant.colorFilter);
            });

        // -----------------------------------------
        // Check Size Match
        // -----------------------------------------
        // Check if the product has at least one
        // size selected by the user.
        const sizeMatch =
            sizes.length === 0 ||
            product.sizes.some((size) => {
                return sizes.includes(size.value);
            });

        // -----------------------------------------
        // Return Matching Products
        // -----------------------------------------
        // Keep the product only when it matches
        // both the selected color and size.
        return colorMatch && sizeMatch;
    });

    // Return the products that matched the filters
    return filteredResult;
}
export default filterProduct