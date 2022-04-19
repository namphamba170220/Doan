import React, { useEffect, useState } from "react";
import productApi from "../../Api/productApi";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import Section, {
  SectionBody,
  SectionTitle,
} from "../../components/Section/Section";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";

const Product = (props) => {
  const [productData, setProductData] = useState([]);
  const [id, setId] = useState(null);
  const relatedProducts = productData.slice(0, 8);
  const arrProductData = JSON.stringify(Object.assign({}, productData))
  const product = JSON.parse(arrProductData)
  useEffect(() => {
    productApi.getAll().then((res) => {
      setProductData(res?.data);
    });
  }, []);

  const handelShowProduct = (id) => {
    setId(id);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Helmet title="{product[id].title}">
      {/* <Section>
        <SectionBody>
          <ProductView product={productData} />
        </SectionBody>
      </Section> */}
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
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
    </Helmet>
  );
};

export default Product;
