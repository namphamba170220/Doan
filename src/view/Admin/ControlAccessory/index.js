import { Button } from "antd";
import React, { useEffect, useState } from "react";
import accessoryApi from "../../../Api/accessoryApi";
import Grid from "../../../components/Grid/Grid";
import Helmet from "../../../components/Helmet/Helmet";
import Section, { SectionBody } from "../../../components/Section/Section";
import AddAccessory from "../AddAccessory";
import AdminAccessoryCard from "../AdminAccessoryCard";

function ControlAccessory() {
  const [accessoryData, setAccessoryData] = useState([]);
  const [isModalAddAccessory, setIsModalAddAccessory] = useState(false);
  const [accessoryDetail, setAccessoryDetail] = useState(null);

  const closeModal = () => {
    setIsModalAddAccessory(false);
    setAccessoryDetail(null);
  };
  const showModalAddNew = () => {
    setIsModalAddAccessory(true);
  };
  useEffect(() => {
    accessoryApi.getAll().then((res) => {
      if (res.statusText === "OK") {
        setAccessoryData(res?.data);
      }
    });
  }, []);

  return (
    <Helmet title="Quản lí phụ kiện">
      <Button onClick={showModalAddNew}>Add New</Button>
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
        />
      )}
    </Helmet>
  );
}

export default ControlAccessory;
