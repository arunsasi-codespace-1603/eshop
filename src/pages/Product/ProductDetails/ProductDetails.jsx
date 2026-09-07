import "./ProductDetails.scss";

// React Core
import { useState, useEffect } from "react";
import { useParams } from "react-router";
// Data
import productData from "../../../data/allProducts.json";
// Library
import { Heart } from "react-bootstrap-icons";
// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import EmptyState from "../../../components/ui/EmptyState/EmptyState";
import MediaGallery from "../ProductDetails/ProductGallery/MediaGallery/MediaGallery";
import Footer from "../../../components/ui/Footer/Footer";
// Helper files
import useIsMobile from "../../../hooks/useIsMobile";

const ProductDetails = () => {

    const [itemSize, setItemSize] = useState(null);
    const [isSizeEmpty, setIsSizeEmpty] = useState(false);
    const isMobile = useIsMobile();

    // ------------------------------------------
    // Fetch parameters from URL
    // ------------------------------------------
    const { pId, slug } = useParams();
    const productId = Number(pId);

    // ------------------------------------------
    // Fetch Product
    // ------------------------------------------
    const allProducts = productData.products;
    const product = allProducts.find((product) => {
        return product.id === productId;
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
    // If the product not found
    // ------------------------------------------
    if (!product) {
        return <EmptyState />
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
        setIsSizeEmpty(false)
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
                                            {size.value}
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

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
export default ProductDetails;