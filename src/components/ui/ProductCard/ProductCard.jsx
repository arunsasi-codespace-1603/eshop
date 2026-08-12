import "./ProductCard.scss";
import { Link } from "react-router-dom";
import slugify from "../slugify/slugify";
import { Heart } from "react-bootstrap-icons";
import EmptyState from "../EmptyState/EmptyState";

const ProductCard = ({ productData }) => {
    const slugName = slugify(productData.name);

    const defaultVariant = productData.variants.find((variant) => {
        return variant.id === productData.defaultVariant;
    });

    return (
        <div className="product-card">
            <div className="product-card__image">
                <Link to={`/product/${productData.id}/${slugName}`}>
                    <img src={defaultVariant.thumbnail} alt={defaultVariant.color} />
                </Link>
                <button className="btn button-wishlist">
                    <Heart />
                </button>
            </div>

            <div className="product-card__content">
                <Link to={`/product/${productData.id}/${slugName}`}>
                    <div className="product-name">{productData.name}</div>
                </Link>

                <div className="product-price">
                    £{productData.price}
                </div>
            </div>
        </div>
    )
}
export default ProductCard