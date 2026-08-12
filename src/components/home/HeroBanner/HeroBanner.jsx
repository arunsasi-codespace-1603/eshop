import "./HeroBanner.scss";

const HeroBanner = ({ imageSrc }) => {
    return (
        <div className="hero-banner">
            <picture className="hero-banner__image">
                <source
                    srcSet={imageSrc}
                    media="(orientation: portrait)" />
                <img src={imageSrc} alt="" />
            </picture>

        </div>
    )
}
export default HeroBanner