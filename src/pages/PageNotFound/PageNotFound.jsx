import "./PageNotFound.scss";

import Navbar from "../../components/ui/Navbar/Navbar";
import Footer from "../../components/ui/Footer/Footer";

const PageNotFound = ({ message }) => {
    return (
        <>
            <Navbar />
            <main>
                <h1>{message}</h1>
            </main>
            <Footer />
        </>
    )
}
export default PageNotFound