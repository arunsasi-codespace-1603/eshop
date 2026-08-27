import "./SearchResultCard.scss";

const SearchResultCard = (
    { productInfo }
) => {

    //------------------------------------------------
    // Find default variable
    //------------------------------------------------
    const defaultVariant = productInfo.variants.find(
        (variant) => variant.id === productInfo.defaultVariant
    );

    return (
        <>
            <div className="search-result-card">
                <div className="search-result-card__image">
                    <img src={defaultVariant.thumbnail} alt={defaultVariant.color} />
                </div>
                <div className="search-result-card__content">
                    <div className="search-result-card__title">
                        {productInfo.name}
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchResultCard;