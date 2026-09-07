import 'swiper/css/scrollbar';
import 'swiper/css/scrollbar';
import "./Newsletter.scss";
// React Core

// Data
import newsletterData from "../../data/newsletter.json";
// Plugins
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

const Newsletter = () => {
    const newsletters = newsletterData.newsletter;
    return (
        <>
            <div className="container-fluid">
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        }
                    }}
                    modules={[Scrollbar]}
                    scrollbar={{
                        el: ".newsletter-scrollbar",
                        draggable: true
                    }}

                >
                    {
                        newsletters.map((newsletter) => (
                            <SwiperSlide key={newsletter.id}>
                                <div key={newsletter.id}
                                    className="newsletter-card">
                                    <div className="newsletter-card__image">
                                        <img
                                            src={newsletter.thumbnail}
                                            alt={newsletter.slug}
                                        />
                                    </div>
                                    <div className="newsletter-card__content">
                                        <div className="newsletter-card__date">
                                            {newsletter.posted}
                                        </div>
                                        <h4 className="newsletter-card__title">
                                            {newsletter.title}
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>

                <div className="newsletter-slider">
                    <div className="newsletter-scrollbar"></div>
                </div>

            </div>
        </>
    )
}
export default Newsletter;