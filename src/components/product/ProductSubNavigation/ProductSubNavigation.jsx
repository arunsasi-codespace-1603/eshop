import "./ProductSubNavigation.scss";
// React Core
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useRef } from "react";
// Data
import categoriesList from "../../../data/category.json";

// Plugins
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";


const ProductSubNavigation = ({
    category,
    subCategory,
}) => {
    const navigateTo = useNavigate();
    const { type } = useParams();
    const swiperRef = useRef(null);
    const categories = categoriesList.categories;

    const categoryData = categories.find((categoryItem) => {
        return categoryItem.slug === category;
    });

    const subCategoryData = categoryData?.children.find((subCategoryItem) => {
        return subCategoryItem.slug === subCategory;
    });

    const navigationItems = useMemo(() => {
        return subCategoryData?.children ?? [];
    }, [subCategoryData]);

    //-----------------------------------------
    // Navigate to sub pages
    //-----------------------------------------
    const handleNavigation = (item) => {
        let path = "";
        if (item.slug === "view-all") {
            path = `/products/${category}/${subCategory}/`;
        } else {
            path = `/products/${category}/${subCategory}/${item.slug}`;
        }
        navigateTo(path);
    }

    //------------------------------------------------
    // Scroll active menu into view
    //------------------------------------------------
    useEffect(() => {
        if (!swiperRef.current) {
            return;
        }

        const activeIndex = navigationItems.findIndex((item) => {
            return type
                ? item.slug === type
                : item.slug === "view-all";
        });

        if (activeIndex !== -1) {
            swiperRef.current.slideTo(activeIndex);
        }

    }, [type, navigationItems]);

    return (
        <>
            <nav className="navbar-category">
                <div className="container-fluid">
                    <div className="navbar-category__container">
                        <Swiper
                            style={{ width: "100%" }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            slidesPerView="auto"
                            spaceBetween={5}
                            freeMode={true}>
                            {navigationItems.map((item) => {
                                const isActive =
                                    item.slug === type ||
                                    (item.slug === "view-all" && !type);
                                return (
                                    <SwiperSlide key={item.slug} style={{ width: "auto" }}>
                                        <button
                                            type="button"
                                            onClick={() => handleNavigation(item)}
                                            className={`btn btn--transparent category-nav-link ${isActive ? "is-active" : ""}`}>
                                            {item.name}
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