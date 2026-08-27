import "./Editorial.scss";
// Ract Core
import { useParams } from "react-router";
// Component Binding
import Navigation from "../../components/ui/Navigation/Navigation";
import Footer from "../../components/ui/Footer/Footer";
import EmptyState from "../../components/ui/EmptyState/EmptyState";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
// Data
import productList from "../../data/allProducts.json";
import categoryList from "../../data/category.json";

const Editorial = () => {
    const { category } = useParams();
    const allProducts = productList.products;
    const allCategories = categoryList.categories;
    console.log(category)

    // get category
    const categoryData = allCategories.find(
        (categ) => categ.slug === category
    );

    const subCategories = categoryData?.children || [];

    console.log("subCategories", subCategories);
    // get all products by its category
    const productByCategory = allProducts.filter((product) => {
        return product.category === category
    });

    if (productByCategory.length === 0) {
        return <EmptyState />
    }
    return (
        <>
            <Navigation />
            <main>
                <section>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, tempora tempore sunt cupiditate omnis id. Et, quia asperiores non harum voluptate porro, nulla incidunt quisquam odit natus unde! Asperiores, expedita.
                </section>

                <section>
                    <div className="container-fluid">
                        <div className="row">
                            {productByCategory.map((product) => (
                                <div key={product.slug}>
                                    <ProductCard productData={product} />
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
export default Editorial