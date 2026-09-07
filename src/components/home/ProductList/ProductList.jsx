import "./ProductList.scss";

import { Link } from "react-router";
import ProductCard from "../../ui/ProductCard/ProductCard"
import EmptyState from "../../ui/EmptyState/EmptyState";

const  ProductList = ({
    title,
    categoryName,
    subCategoryName,
    products = [],
    discoverLink
}) => {

    if (products.length === 0) {
        return <EmptyState />
    }
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="section-content">
            <div className="container-fluid">
                <div className="section-content__header">
                    <div className="section-content__sub-title">
                        {categoryName}
                    </div>
                    <h3 className="section-content__title">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.slug}
                            className="grid-column">
                            <ProductCard
                                productData={product} />
                        </div>
                    ))}
                </div>

                <div className="section-content__cta">
                    <Link
                        className="btn-borderless"
                        to={discoverLink}>
                        Discover All
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ProductList