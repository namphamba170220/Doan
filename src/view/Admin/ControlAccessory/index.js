import { Button } from "antd";
import React, { useEffect, useState } from "react";
import accessoryApi from "../../../Api/accessoryApi";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import Section, { SectionBody } from "../../../components/Section/Section";
import AddAccessory from "../AddAccessory";
import AdminAccessoryCard from "../AdminAccessoryCard";
import ReactLoading from "react-loading";
function ControlAccessory() {
  const [accessoryData, setAccessoryData] = useState([]);
  const [isModalAddAccessory, setIsModalAddAccessory] = useState(false);
  const [accessoryDetail, setAccessoryDetail] = useState(null);
  const [done, setDone] = useState(undefined);
  const [totalProducts, setTotalProducts] = useState(0);
  const closeModal = () => {
    setIsModalAddAccessory(false);
    setAccessoryDetail(null);
  };
  const showModalAddNew = () => {
    setIsModalAddAccessory(true);
  };

  const onModalSuccess = () => {
    accessoryApi.getAll().then((res) => {
      setAccessoryData(res?.data);
      setTotalProducts(res?.data.length);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      accessoryApi.getAll().then((res) => {
        if (res.statusText === "OK") {
          setAccessoryData(res?.data);
          setTotalProducts(res?.data.length);
        }
      });
      setDone(true);
    }, 2000);
  }, []);

  return (
    <Helmet title="Quản lí phụ kiện">
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
                {accessoryData.map((item, index) => (
                  <AdminAccessoryCard
                    id={item.id}
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    title={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                    categoryslug={item.categoryslug}
                    color={item.colors}
                    description={item.description}
                    setAccessoryData={setAccessoryData}
                    onSuccess={onModalSuccess}
                    item={item}
                  ></AdminAccessoryCard>
                ))}
              </Grid>
            </SectionBody>
          </Section>
          {isModalAddAccessory && (
            <AddAccessory
              openModal={isModalAddAccessory}
              onClose={closeModal}
              accessoryDetail={accessoryDetail}
              setAccessoryData={setAccessoryData}
              onSuccess={onModalSuccess}
              setDone={setDone}
            />
          )}
        </>
      )}
    </Helmet>
  );
}

export default ControlAccessory;
