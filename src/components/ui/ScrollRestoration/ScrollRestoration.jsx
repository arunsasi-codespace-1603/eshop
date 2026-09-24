import "./ScrollRestoration.scss";
// React Core
import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router";

const ScrollRestoration = () => {
    const location = useLocation();
    const typeOfNavigation = useNavigationType();
    useEffect(() => {
        const scrollKey = `scroll-${location.key}`;

        if (typeOfNavigation === "POP") {
            const savedPosition = sessionStorage.getItem(scrollKey);

            if (savedPosition) {
                window.scrollTo(0, Number(savedPosition));
            } else {
                window.scrollTo(0, 0);
            }
            return;
        }
        window.scrollTo(0, 0);
    }, [location.key, typeOfNavigation]);

    return null;
}
export default ScrollRestoration;