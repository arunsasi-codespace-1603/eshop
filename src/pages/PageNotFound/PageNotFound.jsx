import "./PageNotFound.scss";
// React Core
import { Link } from "react-router-dom";

// Icons
import { QuestionDiamondFill } from "react-bootstrap-icons";

// Component Binding
import Navigation from "../../components/ui/Navigation/Navigation";
import Footer from "../../components/ui/Footer/Footer";

const PageNotFound = ({
    title = "Page Not Found",
    message = "We apologise, we cannot find the page you are looking for. Please contact our Client Services or navigate to another page. Thank you.",
    imageUrl = "https://dummyimage.com/600x400/000/fff",
    imageAlt = "Page not found",
    buttonText = "Go to home page",
    buttonLink = "/",
}) => {
    return (
        <>
            <Navigation />
            <main>
                <section className="page-not-found">
                    <div className="container">
                        <div className="page-not-found__container text-center">
                            <p className="page-not-found__caption-sm">404</p>

                            <div className="page-not-found__image text-center">
                                <QuestionDiamondFill />
                            </div>

                            <h1 className="page-not-found__caption-lg">
                                {title}
                            </h1>

                            <div className="page-not-found__content">
                                {message}
                            </div>

                            <Link
                                to={buttonLink}
                                className="btn btn-borderless">
                                {buttonText}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
export default PageNotFound