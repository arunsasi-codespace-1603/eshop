import { BagX } from "react-bootstrap-icons";
import "./EmptyState.scss";

const EmptyState = () => {
    return (
        <>
            <div className="empty-state text-center">
                <div className="empty-state__container">

                    <div className="empty-state__illustration">
                        <BagX />
                    </div>
                    <h3 className="empty-state__title">No products match your filters.</h3>

                    <div className="empty-state__content">
                        Try changing or clearing your filters to see more products.
                    </div>
                </div>
            </div>
        </>
    )
}
export default EmptyState