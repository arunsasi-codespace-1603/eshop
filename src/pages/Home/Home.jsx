import "./Home.scss";
// Data
import CategoryItems from "../../data/category.json";
import ProductItems from "../../data/allProducts.json";
import collectionsData from "../../data/collection.json";
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
    const collectionList = collectionsData.collections;
    //------------------------------------------------
    // Get a random collections for Hero Banner
    //------------------------------------------------
    const randomNumber = Math.floor(Math.random() * collectionList.length);
    const randomCollection = collectionList[randomNumber];

    //------------------------------------------------
    // Filter products by category and subcategory
    //------------------------------------------------
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


    //------------------------------------------------
    // Get subcategory
    //------------------------------------------------
    const getSubcategories = (categories, mainCategory) => {
        if (!mainCategory) {
            return [];
        }

        const category = categories.find(
            (category) => category.slug === mainCategory
        );
        return category?.children ?? [];
    }

    const womenSubcategories = getSubcategories(categoryList, "women");
    const menSubcategories = getSubcategories(categoryList, "men");


    return (
        <>
            <Navigation />
            <main>
                <section className="hm-hero-banner">
                    <VideoBanner
                        sourceFile={randomCollection.editorialVideo}
                        videoSubTitle={randomCollection.name}
                        videoTitle={randomCollection.title}
                        linkTo={randomCollection.urlPath}
                    />
                </section>
                <section className="hm-categories">
                    <div className="section-content">
                        <div className="section-content__header">
                            <h3 className="section-content__title">
                                Explore the collections
                            </h3>
                        </div>

                        <CategoryList
                            mainCategory="women"
                            categories={womenSubcategories} />
                        <CategoryList
                            mainCategory="men"
                            categories={menSubcategories} />
                    </div>
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