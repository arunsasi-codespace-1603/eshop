import "./Breadcrumb";

const Breadcrumb = ({
    category,
    subCategory,
    type,
    categoryList
}) => {
    console.log(categoryList)
    return (
        <>
            <nav
                aria-label="breadcrumb"
                className="breadcrumb">
                <ol className="breadcrumb__list">
                    <li className="breadcrumb__item"><a href="#">Home</a></li>
                    <li className="breadcrumb__item" aria-current="page">Library</li>
                </ol>
            </nav>
        </>
    )
}
export default Breadcrumb