import "./CollectionList.scss";

// Core React
import { useParams } from "react-router";
// Data
import collectionList from "../../../data/collection.json";

// Component Binding
import Navigation from "../../ui/Navigation/Navigation";
import Footer from "../../ui/Footer/Footer";
// Component Binding
import CollectionCard from "../CollectionCard/CollectionCard";
import EmptyState from "../../ui/EmptyState/EmptyState";

const CollectionList = () => {
    const { gender } = useParams();
    const allCollections = collectionList.collections;
    //------------------------------------------------
    // Get collections by gender
    //------------------------------------------------
    const collectionsByGender = allCollections.filter((collection) => {
        return collection.gender === gender
    });

    if (collectionsByGender.length === 0) {
        return <EmptyState />
    }

    return (
        <>
            <Navigation />
            <main>
                <section>
                    {
                        collectionsByGender.map((collection) => (
                            <div key={collection.slug}>
                                <CollectionCard collection={collection} />
                            </div>
                        ))
                    }
                </section>
            </main>
            <Footer />
        </>
    )
}
export default CollectionList;