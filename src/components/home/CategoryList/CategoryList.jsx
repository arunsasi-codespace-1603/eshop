import "./CategoryList.scss";

import CategoryCard from "../../ui/CategoryCard/CategoryCard"

const CategoryList = ({
    title,
    mainCategory,
    categories
}) => {
    return (


        <div className="container-fluid">
            <div className="row">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        mainCategory={mainCategory}
                        category={category}
                    />
                ))}
            </div>
        </div>

    )

}
export default CategoryList