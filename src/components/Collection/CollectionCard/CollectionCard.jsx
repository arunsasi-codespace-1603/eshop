import "./CollectionCard.scss";

// React Core
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// Data
import collectionList from "../../../data/collection.json";

// Component Binding
import Navigation from "../../ui/Navigation/Navigation";
import Footer from "../../ui/Footer/Footer";
import PageNotFound from "../../../pages/PageNotFound/PageNotFound";

const CollectionCard = () => {
    const { gender } = useParams();
    const collections = collectionList.collections;
    const selectedCollection = collections.filter((collection) => {
        return collection.gender === gender;
    });


    if (selectedCollection.length === 0) {
        return <PageNotFound />;
    }

    return (
        <>
            <Navigation />
            <main>
                <section className="section-content">
                    <div className="container-fluid">
                        <div className="row">

                            {selectedCollection.map((collection) => (
                                <div key={collection.id}
                                    className="collection-grid">
                                    <div className="collection-card">
                                        <picture className="hero-banner__image">
                                            <source
                                                media="(max-width: 768px)"
                                                srcSet={collection.mobileBannerImage}
                                            />
                                            <img
                                                src={collection.heroBannerImage}
                                                alt={collection.name}
                                            />
                                        </picture>
                                        <div className="collection-card__overlay">
                                            <div className="collection-card__content">
                                                <h2 className="collection-card__title">
                                                    {collection.title}
                                                </h2>

                                                <div className="collection-card__subtitle ">
                                                    {collection.subtitle}
                                                </div>

                                                <Link to={collection.urlPath}
                                                    className="btn btn-borderless color-white">
                                                    Discover the collection
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
export default CollectionCard