import "./SearchSuggestions.scss";
// React Core
import { Link } from "react-router-dom";
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
            {/* <div className="result-footer">
                <div className="label">{totalSearchResult} item(s)</div>
                {totalSearchResult > 4 &&
                    <Link
                        to={`/search?q=${encodeURIComponent(query)}`}
                        onClick={closeSearch}
                    >
                        <button
                            type="button"
                            className="btn btn-borderless">See all products</button>
                    </Link>
                }
            </div> */}

        </>
    )
}
export default SearchSuggestions;