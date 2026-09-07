import "./SearchResultCard.scss";
// React core
import { Link } from "react-router-dom";

const SearchResultCard = ({
    productInfo,
    closeSearch
}) => {

    //------------------------------------------------
    // Find default variable
    //------------------------------------------------
    const defaultVariant = productInfo.variants.find(
        (variant) => variant.id === productInfo.defaultVariant
    );

    return (
        <Link
            to={`/product/${productInfo.id}/${productInfo.slug}`}
            className="search-result-card"
            onClick={closeSearch}
        >
            <div className="search-result-card__image">
                <img
                    src={defaultVariant.thumbnail}
                    alt={defaultVariant.color}
                />
            </div>

            <div className="search-result-card__content">
                <div className="search-result-card__title">
                    {productInfo.name}
                </div>
            </div>
        </Link>
    );
}
export default SearchResultCard;