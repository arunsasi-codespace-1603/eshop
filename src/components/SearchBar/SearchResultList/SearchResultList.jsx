import "./SearchResultList.scss";
// Component Binding
import ProductCard from "../../ui/ProductCard/ProductCard";
const SearchResultList = ({
    products = []
}) => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="grid-column">
                            <ProductCard productData={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SearchResultList;