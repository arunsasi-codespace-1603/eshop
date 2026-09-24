import "./ProductDetails.scss";

// React Core
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// Icons
import { ChevronRight, Heart } from "react-bootstrap-icons";

// Data
import productData from "../../../data/allProducts.json";

// Helper files
import useIsMobile from "../../../hooks/useIsMobile";

// Context
import { CartContext } from "../../../context/CartContext";

// Component Binding
import Navigation from "../../../components/ui/Navigation/Navigation";
import MediaGallery from "../ProductDetails/ProductGallery/MediaGallery/MediaGallery";
import Footer from "../../../components/ui/Footer/Footer";
import ProductCard from "../../../components/ui/ProductCard/ProductCard";
import SideDrawer from "../../../components/ui/SideDrawer/SideDrawer";
import PageNotFound from "../../PageNotFound/PageNotFound";

const ProductDetails = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isSizeEmpty, setIsSizeEmpty] = useState(false);
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
    const relatedProducts = product?.relatedProducts ?? [];
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
        setSideDrawerContent({
            title: data.title,
            text: data.text
        });
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

    // ------------------------------------------
    // Item in cart
    // ------------------------------------------
    const itemInCart = cartItems.some((cartItem) => {
        return cartItem.productId === productId;
    });

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
        setSelectedSize(size);
        setIsSizeEmpty(false)
    }
    console.log("Cart Items", cartItems)
    // ------------------------------------------
    // Add to Cart
    // ------------------------------------------
    const addToCart = (
        prodId,
        colorVariant,
        sizeVariant
    ) => {

        if (sizes.length > 0 && sizeVariant === null) {
            // Verify that the user selected a size
            setIsSizeEmpty(true);
            return;
        } else {
            // Reset the size validation message
            setIsSizeEmpty(false);

            // Create a cart item object
            const cartItem = {
                productId: prodId,
                colorVariant,
                sizeVariant,
                quantity: 1
            };

            // Add the item to the cart
            setCartItems([
                ...cartItems,
                cartItem
            ]);
        }
    };

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

                                {sizes.length > 0 && (
                                    <div>
                                        <div className="product-block-variant">
                                            <div className="label">
                                                <span className="label__query">
                                                    Select your size:
                                                </span>
                                                <span className="label__result">
                                                    {(!selectedSize) ? "Not selected" : selectedSize?.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="size-variant-grid">
                                            {sizes.map((size) => (
                                                <div
                                                    key={size.id}
                                                    onClick={() => updateSizeVariant(size)}
                                                    className={`size-variant-grid__column ${size.id === selectedSize?.id ? "active" : ''}`} >
                                                    {size.shortLabel}
                                                </div>
                                            ))}
                                        </div>

                                        {isSizeEmpty &&
                                            <div className="text-danger">
                                                Please choose a size to continue
                                            </div>
                                        }
                                    </div>
                                )}

                                <div className="product-block-purchase">
                                    <button
                                        className="btn button-add-to-wishlist">
                                        <Heart />
                                    </button>

                                    {!itemInCart && (
                                        <button
                                            onClick={() => {
                                                addToCart(
                                                    product.id,
                                                    colorVariant,
                                                    selectedSize
                                                );
                                            }}
                                            className="btn button-add-to-cart"
                                        >
                                            Add to Shopping Bag
                                        </button>
                                    )}

                                    {itemInCart && (
                                        <Link
                                            to="/shopping-bag"
                                            className="btn button-go-to-cart">
                                            Go to Shopping Bag
                                        </Link>
                                    )}
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
                                    You may also like
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