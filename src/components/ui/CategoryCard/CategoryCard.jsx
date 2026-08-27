import "./CategoryCard.scss";

import { Link } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
    const {
        name,
        slug,
        thumbnail
    } = categoryData;

    return (
        <div className="categ-card">
            <Link to={`/products/${slug}`}>
                <div className="categ-card__image">
                    <img
                        src={thumbnail}
                        alt={name} />
                </div>
                <div className="categ-card__content">
                    <div className="categ-card__link">
                        {name}
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default CategoryCard