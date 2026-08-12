import "./ProductList.scss";

import { Link } from "react-router-dom";
import ProductCard from "../../ui/ProductCard/ProductCard"

const ProductList = ({
    title,
    categoryId,
    categories,
    products,
    className }) => {

    // Find slug for url
    const productCategory = categories.find((category) => category.id === categoryId);

    // find the the products with same category Id and display 4 items in a row
    const featuredProducts = products.filter((product) =>
        product.categoryId === categoryId).slice(0, 4);
    if (featuredProducts.length === 0) {
        return null;
    }
    return (
        <div className="section-content">
            <div className="container-fluid">
                <div className="section-content__header">
                    <div className="section-content__sub-title">
                        {productCategory.name}
                    </div>
                    <h3 className="section-content__title">
                        {title}
                    </h3>
                </div>
                <div className="row">
                    {
                        featuredProducts.length > 0 &&
                        featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="grid-column">
                                <ProductCard
                                    productData={product} />
                            </div>
                        ))}
                </div>

                <div className="section-content__cta">
                    <Link
                        className="btn-borderless"
                        to={`/products/${categoryId}/${productCategory.slug}`}>
                        Discover All
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ProductList