import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/Home/Home"
import About from "../pages/About/About"
import ProductsPage from "../pages/Product/ProductsPage/ProductsPage"
import ProductDetails from "../pages/Product/ProductDetails/ProductDetails";
import Editorial from "../pages/Editorial/Editorial";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/product/:pid/:slug" element={<ProductDetails />} /> */}
                {/* <Route path="/products/:categId/:slug" element={<ProductsPage />} /> */}
                <Route path="/products/:category" element={<Editorial />} />
                <Route path="/products/:category/:subCategory" element={<ProductsPage />} />
                <Route path="/products/:category/:subCategory/:type" element={<ProductsPage />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes