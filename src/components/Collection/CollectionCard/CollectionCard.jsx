import "./CollectionCard.scss";

const CollectionCard = ({
    collection
}) => {
    console.log(collection)
    return (
        <>
            <article className={`collection-card`}>
                <img
                    className="collection-card__image"
                    src={collection.heroImage}
                    alt={collection.slug} />
                <div className="collection-card__content">
                    <div className="collection-card__title">
                        {collection.name}
                    </div>
                    <div className="collection-card__subtitle">
                        {collection.subtitle}
                    </div>
                    <button className="btn btn-borderless">
                        Dicover the collection
                    </button>
                </div>
            </article>
        </>
    )
}
export default CollectionCard