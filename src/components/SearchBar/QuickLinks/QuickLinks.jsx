import "./QuickLinks.scss";
// React Core
import { Link } from "react-router";

const QuickLinks = () => {
    return (
        <>
            <div className="quick-links">
                <div className="quick-links__header">
                    Quick Links
                </div>

                <ul className="quick-links__items">
                    <li className="quick-links__link">
                        <Link to="/products/perfume">Perfume</Link>
                    </li>
                    <li className="quick-links__link">
                        <Link to="/products/bags">Bags</Link>
                    </li>
                    <li className="quick-links__link">
                        <Link to="/products/accessories">Accessories</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default QuickLinks;