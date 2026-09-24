import "./ShoppingBag.scss";
// React Core
import { useContext } from "react";

// Context
import { CartContext } from "../../context/CartContext";

// Data
import productsList from "../../data/allProducts.json";
// Component Binding
import Navigation from "../../components/ui/Navigation/Navigation";
import Footer from "../../components/ui/Footer/Footer";
import CartItems from "./CartItems/CartItems";



const ShoppingBag = () => {
    const { cartItems } = useContext(CartContext);
    const allProducts = productsList.products;

    const cartProducts = allProducts.filter((product) => {
        return cartItems.some((cartItem) => {
            return cartItem.productId === product.id;
        });
    });

    console.log("Cart Products", cartProducts);

    return (
        <>
            <Navigation />
            <main>
                <section className="section-content page-shopping-bag">
                    <div className="container">
                        <div className="cart-content">
                            <div className="cart-content__container">
                                <div className="cart-content__left">
                                    <div className="cart-content__header">
                                        Shopping Basket
                                    </div>
                                    <div className="cart-content__body">
                                        {cartProducts.map((product) => {
                                            const cartItem = cartItems.find((cartItem) => {
                                                return cartItem.productId === product.id;
                                            });
                                            return (
                                                <CartItems product={cartItem} key={product.id} />
                                            )
                                        })}
                                    </div>
                                </div>


                                {/* <div className="cart-content__right">
                                    <div className="cart-content__header">
                                        Shopping Summary
                                    </div>
                                    <div className="cart-content__body">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, cumque.
                                    </div>
                                </div> */}

                            </div>
                        </div>



                        {/* {cartProducts.map((product) => {

                            const cartItem = cartItems.find((cartItem) => {
                                return cartItem.productId === product.id;
                            });

                            return (
                                <CartItems product={product} />
                                // <div key={product.id}>

                                //     <h2>{product.name}</h2>

                                //     <p>£{product.price}</p>

                                //     <p>
                                //         Color: {cartItem.colorVariant.color}
                                //     </p>

                                //     <p>
                                //         Size: {cartItem.sizeVariant?.label}
                                //     </p>

                                //     <p>
                                //         Quantity: {cartItem.quantity}
                                //     </p>

                                // </div>
                            );
                        })} */}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
export default ShoppingBag;