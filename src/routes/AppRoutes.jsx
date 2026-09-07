import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/Home/Home"
import About from "../pages/About/About"
import ProductsPage from "../pages/Product/ProductsPage/ProductsPage"
import ProductDetails from "../pages/Product/ProductDetails/ProductDetails";
import CollectionList from "../components/Collection/CollectionList/CollectionList";
import SearchResultsPage from "../components/SearchBar/SearchResultsPage/SearchResultsPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:pId/:slug" element={<ProductDetails />} />
                {/* <Route path="/products/:categId/:slug" element={<ProductsPage />} /> */}
                <Route path="/products/:gender/collections" element={<CollectionList />} />
                <Route path="/products/:category/:subCategory" element={<ProductsPage />} />
                <Route path="/products/:category/:subCategory/:type" element={<ProductsPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes