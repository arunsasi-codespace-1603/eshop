import "./CollectionEmptyState.scss";

// React Core
import { Link, useParams } from "react-router-dom";

const CollectionEmptyState = () => {
    const { gender } = useParams();
    return (
        <div className="collection-empty-state text-center">
            <div className="collection-empty-state__container">

                <h3 className="collection-empty-state__title">
                    This collection is coming soon.
                </h3>

                <div className="collection-empty-state__content">
                    We’re currently preparing the products for this collection.
                    Please check back soon.
                </div>

                <Link
                    to={`/${gender}/collections`}
                    className="btn btn-borderless">
                    Go to collections
                </Link>
            </div>
        </div>
    );
};

export default CollectionEmptyState;