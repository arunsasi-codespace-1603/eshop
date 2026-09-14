import "./ProductNotFound.scss";

// React Core
import { Link } from "react-router-dom";

// Component Binding
import Footer from "../../components/ui/Footer/Footer";
import Navigation from "../../components/ui/Navigation/Navigation";

const ProductNotFound = () => {
    return (
        <>
            <Navigation />
            <main>
                <section className="not-available">
                    <div className="container-fluid">
                        <div className="not-available__container text-center">
                            <div className="not-available__illustration">
                                <img
                                    src="https://dummyimage.com/600x400/000/fff"
                                    alt="No product"
                                ></img>
                            </div>
                            <h3 className="not-available__title">
                                No products match your filters.

                            </h3>
                            <div className="not-available__content">
                                We apologise, we cannot find the products you are looking for. Please contact our Client Services or navigate to another page. Thank you.
                            </div>
                            <Link to="/">
                                <button className="btn btn-borderless">Go to home page</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ProductNotFound;