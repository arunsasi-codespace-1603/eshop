import { Plus, Dash } from "react-bootstrap-icons";
import "./CartItems.scss";

const CartItems = ({ product }) => {
    console.log(product)
    return (
        <>
            <div className="cart-product">
                <div className="cart-product__container">
                    <div className="cart-product__image">
                        <img src={product.colorVariant?.thumbnail} alt="" />
                    </div>
                    <div className="cart-product__content">
                        <h4 className="cart-product__title">
                            Dior Socks
                        </h4>
                        <div className="cart-product__price">
                            $ 451
                        </div>
                        <div className="cart-product__variants">
                            <div className="bullets">Color Red</div>
                        </div>
                    </div>
                </div>
                <div className="cart-product__footer">
                    <div className="quantity">
                        <button className="btn btn-counter-up">
                            <Dash />
                        </button>
                        <input className="quantity__input" type="text" value={1} />
                        <button className="btn btn-counter-up">
                            <Plus />
                        </button>
                    </div>
                    <button className="btn btn-cart-remove ">Remove</button>
                </div>
            </div>
        </>
    )
}
export default CartItems;