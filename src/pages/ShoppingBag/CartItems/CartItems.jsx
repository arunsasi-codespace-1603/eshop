import "./CartItems.scss";

// React Core
import { useContext } from "react";

//Shared Data
import { CartContext } from "../../../context/CartContext";

// Icons
import { Plus, Dash } from "react-bootstrap-icons";
import { Link } from "react-router";

const CartItems = ({ product, cartItem }) => {
    const { cartItems, setCartItems } = useContext(CartContext);

    //-----------------------------------------
    // Decrease cart count
    //-----------------------------------------
    const decreaseQuantity = () => {
        if (cartItem.quantity <= 1) {
            return;
        }

        const updatedCartItems = cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }

            return item;
        });

        setCartItems(updatedCartItems);
    };

    //-----------------------------------------
    // Increase cart count
    //-----------------------------------------
    const increaseQuantity = () => {
        if (cartItem.quantity >= 10) {
            return;
        }
        const updatedCartItems = cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });

        setCartItems(updatedCartItems);
    };

    // ------------------------------------------
    // Remove item
    // ------------------------------------------
    const removeFromCart = () => {
        const updatedCartItems = cartItems.filter((item) => {
            return item.cartItemId !== cartItem.cartItemId;
        });

        setCartItems(updatedCartItems);
    }

    return (
        <>
            <div className="cart-product">
                <div className="cart-product__container">
                    <div className="cart-product__image">
                        <Link to={`/product/${product.id}/${product.slug}`}>
                            <img src={cartItem.colorVariant?.thumbnail} alt={product.name} />
                        </Link>
                    </div>
                    <div className="cart-product__content">
                        <h4 className="cart-product__title">
                            {product.name}
                        </h4>

                        <div className="cart-product__group">
                            <div className="cart-product__price">
                                £{product.price}
                            </div>
                            {cartItem.sizeVariant && (
                                <div className="points">
                                    Size:
                                    <span>{cartItem.sizeVariant.label}</span>
                                </div>
                            )}
                        </div>
                        <div className="cart-product__variants">
                            <div className="points">
                                Color:
                                <span>
                                    {cartItem.colorVariant.color}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-product__footer">
                    <div className="quantity">
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={cartItem.quantity <= 1}
                            className="btn btn-counter-up">
                            <Dash />
                        </button>
                        <div className="quantity__input">
                            {cartItem.quantity}
                        </div>
                        <button
                            type="button"
                            onClick={increaseQuantity}
                            disabled={cartItem.quantity >= 10}
                            className="btn btn-counter-up">
                            <Plus />
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={removeFromCart}
                        className="btn btn-cart-remove ">Remove</button>
                </div>
            </div>
        </>
    )
}
export default CartItems;