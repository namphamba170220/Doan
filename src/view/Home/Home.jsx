import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroSliderApi from "../../Api/heroSliderApi";
import policyApi from "../../Api/policyApi";
import productApi from "../../Api/productApi";
import banner from "../../assets/images/banner.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import PolicyCard from "../../components/Policy/PolicyCard";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/Section/Section";
import HeroSlider from "../../components/Slider/HeroSlider";
import ProductCard from "../Product/ProductCard";
import ProductViewModal from "../Product/ProductViewModal";
import ReactLoading from "react-loading";
const Home = () => {
  const [productData, setProductData] = useState([]);
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [heroSliderData, setHeroSliderData] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      productApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setProductData(res.data);
        }
      });
      heroSliderApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setHeroSliderData(res.data);
        }
      });
      policyApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setPolicyData(res.data);
        }
      });
      setDone(true);
    }, 2000);
  }, []);

  const closeModal = () => {
    setIsShowModalProduct(false);
    setProductData([]);
  };

  return (
    <Helmet title="Trang chủ">
      {!done ? (
        <ReactLoading type={"balls"} color={"blue"} height={100} width={100} />
      ) : (
        <>
          <HeroSlider
            data={heroSliderData}
            control={true}
            auto={false}
            timeOut={5000}
          />

          <Section>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {policyData.map((item, index) => (
                  <Link key={index} to="/contact">
                    <PolicyCard
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                    />
                  </Link>
                ))}
              </Grid>
            </SectionBody>
          </Section>

          <Section>
            <SectionBody>
              <Link to="/catalog">
                <img
                  src={banner2}
                  alt=""
                  style={{ width: "100%", height: "500px" }}
                />
              </Link>
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productData.slice(4, 8).map((item, index) => (
                  <ProductCard
                    id={item.id}
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>sản phẩm mới</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productData.slice(0, 6).map((item, index) => (
                  <ProductCard
                    id={item.id}
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>

          <Section>
            <SectionBody>
              <Link to="/catalog">
                <img src={banner} alt="" style={{ width: "100%" }} />
              </Link>
            </SectionBody>
          </Section>

          <Section>
            <SectionTitle>Phổ biến</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productData.slice(6, 14).map((item, index) => (
                  <ProductCard
                    id={item.id}
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
          {isShowModalProduct && (
            <ProductViewModal
              openModal={isShowModalProduct}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </Helmet>
  );
};
export default Home;
