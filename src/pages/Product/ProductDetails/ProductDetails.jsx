import "./ProductDetails.scss";

// React Core
import { useState, useEffect } from "react";
import { useParams } from "react-router";

// Icons
import { ChevronRight, Heart } from "react-bootstrap-icons";

// Data
import productData from "../../../data/allProducts.json";

// Helper files
import useIsMobile from "../../../hooks/useIsMobile";

// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import MediaGallery from "../ProductDetails/ProductGallery/MediaGallery/MediaGallery";
import Footer from "../../../components/ui/Footer/Footer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import SideDrawer from "../../../components/ui/SideDrawer/SideDrawer";
import PageNotFound from "../../PageNotFound/PageNotFound";

const ProductDetails = () => {

    const [itemSize, setItemSize] = useState(null);
    // const [isSizeEmpty, setIsSizeEmpty] = useState(false);
    const isMobile = useIsMobile();
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
    const [sideDrawerContent, setSideDrawerContent] = useState({
        title: "",
        text: ""
    });

    // ------------------------------------------
    // Fetch parameters from URL
    // ------------------------------------------
    const { pId } = useParams();
    const productId = Number(pId);

    // ------------------------------------------
    // Fetch Product
    // ------------------------------------------
    const allProducts = productData.products;
    const product = allProducts.find((product) => {
        return product.id === productId;
    });

    // ------------------------------------------
    // Fetch related products
    // ------------------------------------------
    const { relatedProducts } = product;
    const relatedItems = allProducts.filter((product) => {
        return relatedProducts.includes(product.id)
    });

    // ------------------------------------------
    // Set default color variant
    // ------------------------------------------
    const defaultColorVariant = product?.variants.find(
        (variant) => variant.id === product.defaultVariant
    );
    const [colorVariant, setColorVariant] = useState(
        defaultColorVariant
    );

    useEffect(() => {
        setColorVariant(defaultColorVariant);
    }, [productId, defaultColorVariant]);

    // ------------------------------------------
    // Side Drawer for contents
    // ------------------------------------------
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
    // ------------------------------------------
    // If the product not found
    // ------------------------------------------
    if (!product) {
        return <PageNotFound />
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
        variants
    } = product;

    // ------------------------------------------
    // Update color varient
    // ------------------------------------------
    const updateColorVariant = (variantId) => {
        const selectedVariant = variants.find((variant) => {
            return variant.id === variantId
        });
        setColorVariant(selectedVariant);
    }
    // ------------------------------------------
    // Update size varient
    // ------------------------------------------
    const updateSizeVariant = (size) => {
        setItemSize(size);
        // setIsSizeEmpty(false)
    }

    return (
        <>
            <Navigation />
            <main>
                <section className="section-product-details">
                    <div className="section-product-details__wrapper">
                        <div className="section-product-details__left">

                            {(isMobile) &&
                                <div className="media-small">
                                    <MediaGallery carouselImages={colorVariant.images} />
                                </div>
                            }
                            {(!isMobile) &&
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
                            }
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
                                        <span className="label__query">Select color:</span>
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
                                            Select your size:
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
                                            {size.shortLabel}
                                        </div>
                                    ))}
                                </div>
                                <div className="product-block-purchase">
                                    <button
                                        className="btn button-add-to-wishlist">
                                        <Heart />
                                    </button>
                                    <button
                                        className="btn button-add-to-cart">
                                        Add to Shopping Bag
                                    </button>
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
                                    {/* <div className="info-expandable__list">
                                        <button
                                            onClick={() => openSideDrawer(deliveryAndReturns)}
                                            className="btn info-expandable__button">
                                            <span>Deliver & Return</span>
                                            <span className="icon"><ChevronRight /></span>
                                        </button>
                                    </div> */}
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

                {relatedItems.length &&
                    <section className="related-items">
                        <div className="container-fluid">
                            <div className="text-left">
                                <h3 className="related-items__title">
                                    Related Products
                                </h3>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row">

                                {relatedItems.map((items) => (
                                    <div key={items.id}
                                        className="grid-column">
                                        <ProductCard productData={items} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </section>
                }
            </main>


            <SideDrawer
                isOpen={isSideDrawerOpen}
                title={sideDrawerContent.title}
                content={sideDrawerContent.text}
                closeSideDrawer={closeSideDrawer} />

            <Footer />
        </>
    )
}
export default ProductDetails;