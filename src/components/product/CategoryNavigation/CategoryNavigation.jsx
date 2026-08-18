import "./CategoryNavigation.scss";
import "swiper/css";
// import Libraray
import { useParams } from "react-router";
// import plugins
import { Swiper, SwiperSlide } from "swiper/react";
const categories = [
    "View All",
    "Handbags",
    "Crossbody",
    "Totes",
    "Wallets",
    "Shoes"
]
const CategoryNavigation = () => {
    const categNavLink = useParams();
    console.log(categNavLink)
    return (
        <nav className="navbar-category">
            <div className="container">
                <div className="navbar-category__container">
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={32}
                        freeMode={true}>
                        {categories.map((category, index) => (
                            <SwiperSlide key={index} style={{ width: "auto" }}>
                                <button

                                    className="btn btn--transparent category-nav-link">
                                    {category}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </nav>
    )
}
export default CategoryNavigation;