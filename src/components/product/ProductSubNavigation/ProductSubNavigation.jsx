import "./ProductSubNavigation.scss";
import "swiper/css";
// Core React Files
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
// Plugins
import { Swiper, SwiperSlide } from "swiper/react";
const ProductSubNavigation = ({
    category,
    subCategory,
    navigation
}) => {
    const navigateTo = useNavigate();
    const { type } = useParams();
    const swiperRef = useRef(null);
    //------------------------------------------------
    // Navigation Function
    //------------------------------------------------
    const pageNavigation = (menu) => {
        if (menu.slug === "view-all") {
            navigateTo(`/products/${category}/${subCategory}`);
            return;
        }
        const path = `/products/${category}/${subCategory}/${menu.slug}`;
        navigateTo(path);
    }
    //------------------------------------------------
    // Scroll active item into view
    //------------------------------------------------
    useEffect(() => {
        if (!swiperRef.current) {
            return;
        }

        const activeIndex = navigation.findIndex((menu) => {
            return type
                ? menu.slug === type
                : menu.slug === "view-all";
        });

        if (activeIndex !== -1) {
            swiperRef.current.slideTo(activeIndex);
        }

    }, [type, navigation]);

    return (
        <>
            <nav className="navbar-category">
                <div className="container-fluid">
                    <div className="navbar-category__container">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            slidesPerView="auto"
                            spaceBetween={5}
                            freeMode={true}>
                            {navigation.map((menu) => {
                                const isActive =
                                    menu.slug === type ||
                                    (menu.slug === "view-all" && !type);

                                return (
                                    <SwiperSlide key={menu.slug} style={{ width: "auto" }}>
                                        <button
                                            onClick={() => pageNavigation(menu)}
                                            className={`btn btn--transparent category-nav-link ${isActive ? "is-active" : ""}`}>
                                            {menu.name}
                                        </button>
                                    </SwiperSlide>
                                )

                            })}
                        </Swiper>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default ProductSubNavigation;