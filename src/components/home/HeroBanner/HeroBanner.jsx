import "./HeroBanner.scss";

const HeroBanner = ({
    desktopImage,
    mobileImage,
    altTag
}) => {
    return (
        <div className="hero-banner">
            <picture className="hero-banner__image">
                <source
                    media="(max-width: 768px)"
                    srcSet={mobileImage}
                />
                <img
                    src={desktopImage}
                    alt={altTag}
                />
            </picture>

        </div>
    )
}
export default HeroBanner