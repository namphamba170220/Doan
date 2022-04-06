import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import { Button } from "antd";
import productApi from "../Api/productApi";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import Helmet from "../components/Helmet";
import Section, { SectionBody } from "../components/Section";

import accessoryApi from "../Api/accessoryApi";
import AdminProductCard from "../components/AdminProductCard";
export default function Admin() {
  const [productData, setProductData] = useState([]);
  const [accessoryData, setAccessoryData] = useState([]);

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.statusText === "OK") {
        setProductData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    accessoryApi.getAll().then((res) => {
      if(res.statusText === 'OK') {
        setAccessoryData(res.data);
      }
    })
  },[])
  return (
    <Helmet title="Admin">
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={1} smCol={1} gap={1}>
            {productData.map((item, index) => (
              <AdminProductCard key={index} img01={item.image01} img02={item.image02} name={item.title} price={Number(item.price)} slug={item.slug}></AdminProductCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={1} smCol={1} gap={1}>
            {accessoryData.map((item, index) => (
              <AdminProductCard key={index} img01={item.image01} img02={item.image02} name={item.title} price={Number(item.price)} slug={item.slug}></AdminProductCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Grid col={2} mdCol={8} smCol={2} gap={20}>
        <li>
          Tên sản phẩm
          <input style={{ width: "50%", marginLeft: "20px" }}></input>
        </li>
        <li>
          Giá sản phẩm
          <input style={{ width: "50%", marginLeft: "40px" }}></input>
        </li>
        <li>
          Ảnh
          <input style={{ width: "50%", marginLeft: "80px" }}></input>
        </li>
        <li>
          Phân Loại
          <input style={{ width: "50%", marginLeft: "63px" }}></input>
        </li>
        <li>
          Màu sắc
          <input style={{ width: "50%", marginLeft: "53px" }}></input>
        </li>
        <li>
          Tên phân loại
          <input style={{ width: "50%", marginLeft: "44px" }}></input>
        </li>
        <li>
          Phiên bản
          <input style={{ width: "50%", marginLeft: "45px" }}></input>
        </li>
        <li>
          Chi tiết sản phẩm
          <input style={{ width: "50%", marginLeft: "20px" }}></input>
        </li>
      </Grid>
      <Button
        style={{
          width: "20%",
          textAlignItem: "center",
          justifyContent: "center",
          right:"0",
          left:"0",
          margin:"40px 600px",
          height: "40px",
          
        }}
      >
        Thêm sản phẩm
      </Button>
    </Helmet>
  );
}
