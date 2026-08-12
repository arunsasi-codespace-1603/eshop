
import "./ProductDetails.scss";
// React core Files
import { useState } from "react";
import { useParams } from "react-router-dom"
// Library
import { Swiper, SwiperSlide } from 'swiper/react';
// Library CSS
import 'swiper/css';
// Icons
import { ChevronRight, Heart } from "react-bootstrap-icons";
// Components
import productData from "../../../data/product.json";
import Navbar from "../../../components/ui/Navbar/Navbar";
import Footer from "../../../components/ui/Footer/Footer";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";
import SideDrawer from "../../../components/ui/SideDrawer/SideDrawer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";


const ProductDetails = () => {
    // ==========================================
    // URL Params
    // ==========================================
    const { pid } = useParams();
    const productId = Number(pid);
    const [itemSize, setItemSize] = useState(null);
    const [isSizeEmpty, setIsSizeEmpty] = useState(false);
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
    const [sideDrawerContent, setSideDrawerContent] = useState({
        title: "",
        text: ""
    });
    const [cart, setCart] = useState([]);

    // ==========================================
    // Fetch product
    // ==========================================
    const product = productData.products.find((product) => {
        return product.id === productId
    });

    // ==========================================
    // Fetch related products
    // ==========================================
    const relatedProductIds = product.relatedProducts;
    const relatedProducts = productData.products.filter((product) => {
        return relatedProductIds.includes(product.id);
    });

    // ==========================================
    // Get default color varient
    // ==========================================
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

    const defaultColorVariant = variants.find((variant) => {
        return variant.id === defaultVariant
    });

    // ==========================================
    // State
    // ==========================================
    const [colorVariant, setColorVariant] = useState(
        defaultColorVariant
    );

    // ==========================================
    // Update color varient
    // ==========================================
    const updateColorVariant = (variantId) => {
        const selectedVariant = variants.find((variant) => {
            return variant.id === variantId
        });
        setColorVariant(selectedVariant);
    }

    // ==========================================
    // Update size varient
    // ==========================================
    const updateSizeVariant = (size) => {
        setItemSize(size);
        setIsSizeEmpty(false)
    }

    // ==========================================
    // Side Drawer for contents
    // ==========================================
    const openSideDrawer = (data) => {
        setSideDrawerContent(data);
        setIsSideDrawerOpen(true);
    }
    const closeSideDrawer = () => {
        console.log("click")
        setSideDrawerContent({
            title: "",
            text: ""
        });
        setIsSideDrawerOpen(false);
    }
    // ==========================================
    // Add to Cart
    // ==========================================
    const addToCart = (pid, size, color) => {
        if (!size) {
            setIsSizeEmpty(true);
            return
        }
        const cartItem = {
            productId: productId,
            variantId: colorVariant.id,
            color: colorVariant.color,
            sizeId: itemSize.id,
            size: itemSize.value,
            quantity: 1,
            price: price
        };
        setCart(prevCart => [
            ...prevCart,
            cartItem
        ])
    }

    if (!product) {
        return <EmptyState />
    }
    return (
        <>
            <Navbar />
            <main>

                <section className="section-product-details">
                    <div className="section-product-details__wrapper">
                        <div className="section-product-details__left">
                            <div className="media-large">
                                {colorVariant.images.map((image, index) => (
                                    <div
                                        key={`${colorVariant.color}_${index}`}
                                        className="media-large__image">
                                        <img
                                            src={image}
                                            alt={`${colorVariant.color}_${index}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="section-product-details__right">
                            <div className="product-content">
                                <div className="product-block-badge">
                                    {badge}
                                </div>
                                <div className="product-block-review">
                                    <span className="product-block-review__count">
                                        {rating}
                                    </span>
                                    <span className="product-block-review__total">
                                        ({reviewCount}) Reviews
                                    </span>
                                </div>
                                <div className="product-block-title">
                                    {name}
                                </div>
                                <div className="product-block-desc">
                                    {shortDescription}
                                </div>
                                <div className="product-block-price">
                                    {(currency === "GBP") ? `£${price}` : ''}
                                </div>
                                <div className="product-block-variant">
                                    <div className="label">
                                        <span className="label__query">Select color</span>
                                        <span className="label__result">{colorVariant.color}</span>
                                    </div>
                                </div>
                                <div className="color-thumbnail-grid">
                                    {variants.map((variant) => (
                                        <div
                                            key={variant.id}
                                            onClick={() => updateColorVariant(variant.id)}
                                            className={`color-thumbnail-grid__column ${(variant.id === colorVariant.id) ? "active" : ''}`}>
                                            <img src={variant.thumbnail} alt={variant.color} />
                                        </div>
                                    ))}
                                </div>

                                <div className="product-block-variant">
                                    <div className="label">
                                        <span className="label__query">
                                            Select your size
                                        </span>
                                        <span className="label__result">
                                            {(!itemSize) ? "Not selected" : itemSize?.label}
                                        </span>
                                    </div>
                                </div>

                                <div className="size-variant-grid">
                                    {sizes.map((size) => (
                                        <div
                                            key={size.id}
                                            onClick={() => updateSizeVariant(size)}
                                            className={`size-variant-grid__column ${size.id === itemSize?.id ? "active" : ''}`} >
                                            {size.value}
                                        </div>
                                    ))}
                                </div>

                                {(isSizeEmpty) &&
                                    <div >Please choose Size to continue</div>}

                                <div className="product-block-variant">
                                    <button
                                        className="btn-borderless"
                                        onClick={() => openSideDrawer(deliveryAndReturns)}
                                    >Size Chart
                                    </button>
                                </div>

                                <div className="product-block-purchase">
                                    <button className="btn button-add-to-wishlist"><Heart /></button>
                                    <button
                                        onClick={() => addToCart(productId, itemSize, colorVariant)}
                                        className="btn button-add-to-cart">Add to Shopping Bag</button>
                                </div>

                                <div className="info-expandable">
                                    <div className="info-expandable__list">
                                        <button
                                            onClick={() => openSideDrawer(description)}
                                            className="btn info-expandable__button">
                                            <span>Product Details</span>
                                            <span className="icon"><ChevronRight /></span>
                                        </button>
                                    </div>
                                    <div className="info-expandable__list">
                                        <button
                                            onClick={() => openSideDrawer(deliveryAndReturns)}
                                            className="btn info-expandable__button">
                                            <span>Deliver & Return</span>
                                            <span className="icon"><ChevronRight /></span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {(relatedProducts.lenth !== 0) &&
                    <section>
                        <div className="section-content">
                            <div className="section-content__header">
                                <h3 className="section-content__title">
                                    You may also like
                                </h3>
                            </div>

                            <div className="container-fluid">
                                <div className="row">
                                    {relatedProducts.map((product) => (
                                        <ProductCard key={product.id} productData={product}></ProductCard>
                                    ))}
                                </div>
                            </div>

                            <div className="container-fluid">

                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {relatedProducts.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <ProductCard productData={product}></ProductCard>
                                        </SwiperSlide>)
                                    )}
                                </Swiper>

                            </div>
                        </div>
                    </section>
                }


                <SideDrawer
                    isOpen={isSideDrawerOpen}
                    title={sideDrawerContent.title}
                    content={sideDrawerContent.text}
                    closeSideDrawer={closeSideDrawer} />
            </main >
            <Footer />
        </>
    )
}
export default ProductDetails