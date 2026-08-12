import "./MediaGallery.scss";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// Library
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

const MediaGallery = ({ carouselImages, productName }) => {
    console.log(carouselImages)
    return (
        <div className="media-gallery">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                scrollbar={{
                    hide: false,
                }}
                modules={[Scrollbar]}
                className="mySwiper"
            >
                {carouselImages.map((image, index) => (
                    <SwiperSlide key={`${productName}_${index}`}>
                        <div className="media-gallery__container">
                            <img className="media-gallery__image" src={image} alt={`${productName}_image_${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}
export default MediaGallery