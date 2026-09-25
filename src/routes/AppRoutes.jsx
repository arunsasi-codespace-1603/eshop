// React Core
import { BrowserRouter, Route, Routes } from "react-router"
// Component Binding
import Home from "../pages/Home/Home"
import About from "../pages/About/About"
import ProductsPage from "../pages/Product/ProductsPage/ProductsPage"
import ProductDetails from "../pages/Product/ProductDetails/ProductDetails";
import CollectionList from "../components/Collection/CollectionList/CollectionList";
import CollectionCard from "../components/Collection/CollectionCard/CollectionCard";
import SearchResultsPage from "../components/SearchBar/SearchResultsPage/SearchResultsPage";
import ScrollRestoration from "../components/ui/ScrollRestoration/ScrollRestoration";
import ShoppingBag from "../pages/ShoppingBag/ShoppingBag";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollRestoration></ScrollRestoration>
            <Routes>
                <Route
                    path="/"
                    element={<Home />} />
                <Route
                    path="/about"
                    element={<About />} />
                <Route
                    path="/product/:pId/:slug"
                    element={<ProductDetails />} />
                <Route
                    path="/:gender/collections"
                    element={<CollectionCard />} />
                <Route
                    path="/:gender/collections/:collectionName"
                    element={<CollectionList />} />
                <Route
                    path="/products/:category/:subCategory"
                    element={<ProductsPage />} />
                <Route
                    path="/products/:category/:subCategory/:type"
                    element={<ProductsPage />} />
                <Route
                    path="/search"
                    element={<SearchResultsPage />} />
                <Route
                    path="/shopping-bag"
                    element={<ShoppingBag />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes