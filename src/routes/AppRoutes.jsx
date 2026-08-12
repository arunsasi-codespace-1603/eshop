import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/Home/Home"
import About from "../pages/About/About"
import ProductsPage from "../pages/Product/ProductsPage/ProductsPage"
import ProductDetails from "../pages/Product/ProductDetails/ProductDetails";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/products/:categId/:slug" element={<ProductsPage />}></Route>
                <Route path="/product/:pid/:slug" element={<ProductDetails />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes