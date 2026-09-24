import "./ShoppingBag.scss";
// React Core
import { useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { CartContext } from "../../context/CartContext";

// Data
import productsList from "../../data/allProducts.json";

// Icons
import { CheckLg } from "react-bootstrap-icons";

// Component Binding
import Navigation from "../../components/ui/Navigation/Navigation";
import Footer from "../../components/ui/Footer/Footer";
import CartItems from "./CartItems/CartItems";
import EmptyCart from "./EmptyCart/EmptyCart";

const ShoppingBag = () => {
    const { cartItems } = useContext(CartContext);
    const allProducts = productsList.products;

    // ------------------------------------------
    // Fetch cart quantity
    // ------------------------------------------
    const cartQuantity = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    // ------------------------------------------
    // Fetch cart total price
    // ------------------------------------------
    const cartTotal = cartItems.reduce((total, cartItem) => {
        const product = allProducts.find((product) => {
            return product.id === cartItem.productId;
        });

        if (!product) {
            return total;
        }

        return total + (product.price * cartItem.quantity);
    }, 0);

    return (
        <>
            <Navigation />
            <main>
                <section className="section-content page-shopping-bag">
                    <div className="container">

                        {cartItems.length === 0 &&
                            <EmptyCart />
                        }

                        {cartItems.length > 0 &&

                            <div className="cart-content">
                                <div className="cart-content__container">
                                    <div className="cart-content__left">
                                        <div className="cart-content__header">
                                            Shopping Basket
                                        </div>
                                        <div className="cart-content__body">
                                            {cartItems.map((cartItem) => {
                                                const selectedProduct = allProducts.find((product) => {
                                                    return product.id === cartItem.productId
                                                });
                                                return (
                                                    <CartItems
                                                        key={cartItem.cartItemId}
                                                        cartItem={cartItem}
                                                        product={selectedProduct} />
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="cart-content__right">
                                        <div className="cart-summary">
                                            <div className="cart-summary__header">
                                                Shopping Summary
                                            </div>
                                            <div className="cart-summary__body">
                                                <div className="delivery-content text-success">
                                                    <div className="delivery-content__icon">
                                                        <CheckLg />
                                                    </div>
                                                    <div className="delivery-content__text">
                                                        Your order qualifies for FREE Delivery. Delivery Details
                                                        Select this option at checkout.
                                                    </div>
                                                </div>
                                                <div className="price-break">
                                                    <div className="price-break__column text-left">
                                                        Subtotal ({cartQuantity}):
                                                    </div>
                                                    <div className="price-break__column text-right">
                                                        £{cartTotal}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-summary__footer">
                                                <button className="btn btn-primary cta-proceed-to-checkout">
                                                    Proceed to checkout
                                                </button>

                                                <Link to="/"
                                                    className="cta-continue-shopping">
                                                    Continue Shopping
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }

                    </div>
                </section>
            </main >
            <Footer />
        </>
    )
}
export default ShoppingBag;