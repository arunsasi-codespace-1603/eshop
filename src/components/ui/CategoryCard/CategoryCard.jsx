import "./CategoryCard.scss";

import { Link } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
    const { id, name, slug, image } = categoryData;
    return (
        <div className="categ-card">
            <div className="categ-card__image">
                <img src={image} alt={name} />
            </div>
            <div className="categ-card__content">
                <Link
                    to={`/products/${id}/${slug}`}
                    className="categ-card__link">
                    {name}
                </Link>
            </div>
        </div>
    )
}
export default CategoryCard