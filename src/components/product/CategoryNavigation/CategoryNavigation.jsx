import "./CategoryNavigation.scss";
import "swiper/css";
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
                                <button className="category-nav-link">
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