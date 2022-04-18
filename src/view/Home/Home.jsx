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
  SectionTitle
} from "../../components/Section/Section";
import HeroSlider from "../../components/Slider/HeroSlider";
import ProductCard from "../Product/ProductCard";


const Home = () => {
  const [productData, setProductData] = useState([]);
  const [heroSliderData, setHeroSliderData] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
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
      {/* end policy section */}

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

      {/* best selling section */}
      <Section>
        <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.slice(4, 8).map((item, index) => (
              <ProductCard
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
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.slice(0, 6).map((item, index) => (
              <ProductCard
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
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" style={{ width: "100%" }} />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>Phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.slice(6, 14).map((item, index) => (
              <ProductCard
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
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
