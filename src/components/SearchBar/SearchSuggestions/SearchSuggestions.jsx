import "./SearchSuggestions.scss";
// Component Binding
import SearchResultCard from "../SearchResultCard/SearchResultCard"

const SearchSuggestions = ({
    products,
    totalCount
}) => {
    return (
        <>
            <div className="result-grid">
                {products.map((product) => (
                    <div
                        key={product.slug}
                        className="result-grid__column">
                        <SearchResultCard productInfo={product} />
                    </div>
                ))}
            </div>
            <div className="result-footer">
                <div className="label">{totalCount} item(s)</div>
                <button className="btn btn-borderless">See all products</button>
            </div>

        </>
    )
}
export default SearchSuggestions;