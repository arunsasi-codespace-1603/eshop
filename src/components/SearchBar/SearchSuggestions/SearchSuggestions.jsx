import "./SearchSuggestions.scss";

// Component Binding
import SearchResultCard from "../SearchResultCard/SearchResultCard"

const SearchSuggestions = ({
    products,
    query,
    closeSearch
}) => {
    const previewResults = products.slice(0, 4);
    const totalSearchResult = products.length;
    return (
        <>
            <div className="result-header">
                <div className="label">
                    {totalSearchResult.toString().padStart(2, "0")} results
                </div>
            </div>
            <div className="result-grid">
                {previewResults.map((product) => (
                    <div
                        key={product.id}
                        className="result-grid__column">
                        <SearchResultCard
                            closeSearch={closeSearch}
                            productInfo={product} />
                    </div>
                ))}
            </div>
        </>
    )
}
export default SearchSuggestions;