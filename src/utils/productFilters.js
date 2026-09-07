export const filterProducts = (
    products,
    selectedValues,
    productProperty,
    itemProperty
) => {
    if (selectedValues.length === 0) {
        return products;
    }

    return products.filter((product) => {
        const items = product[productProperty] || [];

        return items.some((item) =>
            selectedValues.includes(item[itemProperty])
        );
    });
};


export const filterPrice = (products, selectedPrice) => {
    if (selectedPrice === "") {
        return products;
    }

    const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

    return products.filter(
        (product) =>
            product.price >= minPrice &&
            product.price <= maxPrice
    );
};