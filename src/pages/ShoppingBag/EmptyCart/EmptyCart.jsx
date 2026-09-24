import "./EmptyCart.scss";

// React Core
import { Link } from "react-router-dom";

// Icons
import { Bag } from "react-bootstrap-icons";

const EmptyCart = () => {
    return (
        <div className="empty-cart text-center">
            <div className="empty-cart__icon">
                <Bag />
            </div>
            <h3 className="empty-cart__title">Your cart is currently empty</h3>
            <div className="empty-cart__desc">
                Add items to place an order or log in to retrieve your cart.
            </div>

            <Link to="/"
                className="btn btn-borderless">
                Continue shopping
            </Link>
        </div>
    )
}
export default EmptyCart;