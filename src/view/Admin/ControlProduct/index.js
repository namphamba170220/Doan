import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import productApi from "../../../Api/productApi";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import Section, { SectionBody } from "../../../components/Section/Section";
import AddProduct from "../AddProduct/Addproduct";
import AdminProductCard from "../AdminproductCard/AdminProductCard";

function ControlProduct() {
  const [productData, setProductData] = useState([]);
  const [isReloadProduct, setIsReloadProduct] = useState(false);
  const [isModalAddProduct, setIsModalAddProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(null);


  const closeModal = () => {
    setIsModalAddProduct(false);
    setProductDetail(null);
  };
  const showModalAddNew = () => {
    setIsModalAddProduct(true);
  };
 

  const handleReloadProduct = () => {
    setIsReloadProduct(true);
  };
  useEffect(() => {
    productApi
      .getAll()
      .then((res) => {
        if (res.statusText === "OK") {
          setProductData(res.data);
          console.log(res.data);
        }
      })
      .finally(() => {
        setIsReloadProduct(false);
      });
  }, [isReloadProduct]);

  return (
    <Helmet title="Quản lí thiết bị di động">
      <Button icon={<PlusOutlined />} onClick={showModalAddNew}>
        Add New
      </Button>
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={1} smCol={1} gap={1}>
            {productData.map((item, index) => (
              <AdminProductCard
                id={item.id}
                key={index}
                img01={item.image01}
                img02={item.image02}
                title={item.title}
                categoryslug={item.categoryslug}
                price={Number(item.price)}
                slug={item.slug}
                color={item.colors}
                version={item.version}
                description={item.description}
                onReloadProduct={handleReloadProduct}
              ></AdminProductCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {isModalAddProduct && (
        <AddProduct
          openModal={isModalAddProduct}
          onClose={closeModal}
          productDetail={productDetail}
          onReloadProduct={handleReloadProduct}
        />
      )}
    </Helmet>
  );
}

export default ControlProduct;
