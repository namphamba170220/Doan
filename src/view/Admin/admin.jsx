import { Button } from "antd";
import React, { useEffect, useState } from "react";
import accessoryApi from "../../Api/accessoryApi";
import productApi from "../../Api/productApi";
import Grid from "../../components/Grid/Grid";
import Helmet from "../../components/Helmet/Helmet";
import Section, { SectionBody } from "../../components/Section/Section";
import AdminProductCard from "./AdminproductCard/AdminProductCard";

export default function Admin() {
  const [productData, setProductData] = useState([]);
  const [accessoryData, setAccessoryData] = useState([]);
  const [isReloadProduct, setIsReloadProduct] = useState(false);
  const [isReloadAccessory, setIsReloadAccessory] = useState(false);
  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.statusText === "OK") {
        setProductData(res.data);
      }
    })
    .finally(()=>{
        setIsReloadProduct(false)
    })
  }, [isReloadProduct]);

  useEffect(() => {
    accessoryApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setAccessoryData(res.data);
        }
      })
      .finally(()=> {
        setIsReloadAccessory(true)
      })
  }, [isReloadAccessory]);

  const handleReloadProduct = () => {
    setIsReloadProduct(true)
  }

  const handleReloadAccessory = () => {
    setIsReloadAccessory(true)
  }

  return (
    <Helmet title="Admin">
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={1} smCol={1} gap={1}>
            {productData.map((item, index) => (
              <AdminProductCard
                id={item.id}
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
                onReloadProduct={handleReloadProduct}
              ></AdminProductCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={1} smCol={1} gap={1}>
            {accessoryData.map((item, index) => (
              <AdminProductCard
                id={item.id}
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
                onReloadAccessory={handleReloadAccessory}
              ></AdminProductCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
}
