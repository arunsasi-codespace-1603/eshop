
import "./ProductDetails.scss";
// React core Files
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
// Library
import { Swiper, SwiperSlide } from 'swiper/react';
// Library CSS
import 'swiper/css';
// Icons
import { ChevronRight, Heart } from "react-bootstrap-icons";
// Components
import productData from "../../../data/allProducts.json";
import Navbar from "../../../components/ui/Navbar/Navbar";
import Footer from "../../../components/ui/Footer/Footer";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";
import PageNotFound from "../../PageNotFound/PageNotFound";
import SideDrawer from "../../../components/ui/SideDrawer/SideDrawer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import MediaGallery from "../ProductDetails/ProductGallery/MediaGallery/MediaGallery";
import useIsMobile from "../../../hooks/useIsMobile";

const ProductDetails = () => {
    const ProductDetails = () => {
        const { pid, slug } = useParams();
        const productId = Number(pid);

        // Find product
        const product = productData.products.find((product) => {
            return product.id === productId;
        });

        // State MUST be before any conditional return
        const [colorVariant, setColorVariant] = useState(null);
        const [itemSize, setItemSize] = useState(null);
        const [isSizeEmpty, setIsSizeEmpty] = useState(false);
        const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
        const [sideDrawerContent, setSideDrawerContent] = useState({
            title: "",
            text: ""
        });
        const [cart, setCart] = useState([]);

        // Update state when product changes
        useEffect(() => {
            if (!product) {
                return;
            }

            const defaultVariant = product.variants.find((variant) => {
                return variant.id === product.defaultVariant;
            });

            setColorVariant(defaultVariant);
            setItemSize(null);
            setIsSizeEmpty(false);
        }, [productId]);

        // Now conditional return is safe
        if (!product) {
            return <PageNotFound message="Sorry, invalid Product" />;
        }

        const {
            name,
            price,
            currency,
            rating,
            reviewCount,
            badge,
            shortDescription,
            description,
            sizes,
            deliveryAndReturns,
            defaultVariant,
            variants
        } = product;

        // ...
    };
    return (
        <>
            Product Details
        </>
    )
}
export default ProductDetails