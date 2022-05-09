import { Button } from "antd";
import React, { useEffect, useState } from "react";
import productApi from "../../../Api/productApi";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import Section, { SectionBody } from "../../../components/Section/Section";
import AddProduct from "../AddProduct/Addproduct";
import AdminProductCard from "../AdminproductCard/AdminProductCard";
import ReactLoading from "react-loading";
function ControlProduct() {
  const [productData, setProductData] = useState([]);
  const [isModalAddProduct, setIsModalAddProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [done, setDone] = useState(undefined);
  const [totalProducts, setTotalProducts] = useState(0);

  const closeModal = () => {
    setIsModalAddProduct(false);
    setProductDetail(null);
  };
  const showModalAddNew = () => {
    setIsModalAddProduct(true);
  };

  const onModalSuccess = () => {
    productApi.getAll().then((res) => {
      setProductData(res?.data);
      setTotalProducts(res?.data.length);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      productApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setProductData(res?.data);
          setTotalProducts(res?.data.length);
        }
      });
      setDone(true);
    }, 2000);
  }, []);

  return (
    <Helmet title="Quản lí thiết bị di động">
      {!done ? (
        <ReactLoading
          type={"bubbles"}
          color={"blue"}
          height={100}
          width={100}
        />
      ) : (
        <>
          <Button onClick={showModalAddNew}>Thêm mới</Button>
          <div>Tổng số sản phẩm còn trong kho : {totalProducts}</div>
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
                    onSuccess={onModalSuccess}
                    item={item}
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
              onSuccess={onModalSuccess}
              setDone={setDone}
            />
          )}
        </>
      )}
    </Helmet>
  );
}

export default ControlProduct;
