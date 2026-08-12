import "./Home.scss";

import CategoryItems from "../../data/category.json";
import ProductItems from "../../data/product.json";

import Navbar from "../../components/ui/Navbar/Navbar";
import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import CategoryList from "../../components/home/CategoryList/CategoryList";
import ProductList from "../../components/home/ProductList/ProductList";
import Footer from "../../components/ui/Footer/Footer";
import VideoBanner from "../../components/ui/VideoBanner/VideoBanner";

const Home = () => {
    const categoryList = CategoryItems.categories;
    const productList = ProductItems.products;

    return (
        <>
            <Navbar />
            <main>
                <section className="hm-hero-banner">
                    <VideoBanner
                        sourceFile="https://lorem.video/720p"
                        videoSubTitle="Women"
                        videoTitle="Fall-Winter 2026" />
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
                        categoryId={1}
                        categories={categoryList}
                        products={productList}
                    />
                </section>
                <section className="hm-banner">
                    <HeroBanner
                        imageSrc="https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4" />
                </section>
                <section className="hm-products">
                    <ProductList
                        title="The latest"
                        categoryId={8}
                        categories={categoryList}
                        products={productList}
                    />
                </section>
            </main>
            <Footer />
        </>
    )
}
export default Home