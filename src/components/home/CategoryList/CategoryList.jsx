import "./CategoryList.scss";

import CategoryCard from "../../ui/CategoryCard/CategoryCard"

const CategoryList = ({ title, categories }) => {

    return (
        <section>
            <div className="section-content">
                <div className="section-content__header">
                    <h3 className="section-content__title">{title}</h3>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} categoryData={category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )

}
export default CategoryList