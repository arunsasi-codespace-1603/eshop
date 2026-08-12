import "./CategoryBanner.scss";

const CategoryBanner = ({
    imageSource,
    imageTitle }) => {
    return (
        <section>
            <div className="category-banner">
                <div className="container-fluid">
                    <div className="category-banner__container">
                        <img
                            className="category-banner__image"
                            src={imageSource}
                            alt={imageTitle} />
                        <div className="category-banner__overlay">
                            <h2 className="category-banner__title">
                                {imageTitle}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default CategoryBanner