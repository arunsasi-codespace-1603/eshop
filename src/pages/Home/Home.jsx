import "./Home.scss";
// Data
import CategoryItems from "../../data/category.json";
import ProductItems from "../../data/allProducts.json";
// Component Binding
import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import CategoryList from "../../components/home/CategoryList/CategoryList";
import ProductList from "../../components/home/ProductList/ProductList";
import Footer from "../../components/ui/Footer/Footer";
import VideoBanner from "../../components/ui/VideoBanner/VideoBanner";
import Navigation from "../../components/ui/Navigation/Navigation";

const Home = () => {
    const categoryList = CategoryItems.categories;
    const productList = ProductItems.products;

    // Filter products by category and subcategory
    const filterProductsByCategory = (products, category, subCategory) => {
        return products.filter((product) => {
            return (
                product.category === category &&
                product.subCategory === subCategory
            );
        });
    };

    const mensBags = filterProductsByCategory(productList, "men", "bags");
    const womensBags = filterProductsByCategory(productList, "women", "bags");

    return (
        <>
            <Navigation />
            <main>
                <section className="hm-hero-banner">
                    <VideoBanner
                        sourceFile="https://lorem.video/720p"
                        videoSubTitle="Women"
                        videoTitle="Fall-Winter 2026"
                        linkTo="/products/women"
                    />
                </section>
                <section className="hm-categories">
                    <CategoryList
                        title="Explore a Selection of the Maison's Creations"
                        categories={categoryList} />
                </section>
                <section className="hm-banner">
                    <HeroBanner
                        imageSrc="https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE" />
                </section>
                <section className="hm-products">
                    <ProductList
                        title="Fall-Winter 2026"
                        categoryName="Women"
                        subCategoryName="bags"
                        products={womensBags}
                        discoverLink="/products/women/bags"
                    />
                </section>
                <section className="hm-banner">
                    <HeroBanner
                        imageSrc="https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4" />
                </section>
                <section className="hm-products">
                    <ProductList
                        title="Discover autumn 2026"
                        categoryName="Men"
                        subCategoryName="bags"
                        products={mensBags}
                        discoverLink="/products/men/bags"
                    />
                </section>
            </main>
            <Footer />
        </>
    )
}
export default Home