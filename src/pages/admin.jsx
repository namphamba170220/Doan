import React from "react";
import Grid from "../components/Grid";
import { Button } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Helmet from "../components/Helmet";
export default function Admin() {
  return (
    <Helmet title="Admin">
      <Grid col={2} mdCol={8} smCol={2} gap={20}>
        <li>
          Tên sản phẩm
          <input
            style={{ width: "50%", marginLeft: "20px" }}
          ></input>
        </li>
        <li>
          Giá sản phẩm
          <input
            style={{ width: "50%", marginLeft: "40px"}}
          ></input>
        </li>
        <li>
          Ảnh
          <input
            style={{ width: "50%", marginLeft: "80px"}}
          ></input>
        </li>
        <li>
          Phân Loại
          <input
            style={{ width: "50%", marginLeft: "63px"}}
          ></input>
        </li>
        <li>
          Màu sắc
          <input
            style={{ width: "50%", marginLeft: "53px"}}
          ></input>
        </li>
        <li>
          Tên phân loại
          <input
            style={{ width: "50%", marginLeft: "44px"}}
          ></input>
        </li>
        <li>
          Phiên bản
          <input
            style={{ width: "50%", marginLeft: "45px"}}
          ></input>
        </li>
        <li>
          Chi tiết sản phẩm
          <input
            style={{ width: "50%", marginLeft: "20px"}}
          ></input>
        </li>
      </Grid>
      <Button
        style={{
          width: "20%",
          textAlignItem: "center",
          justifyContent: "center",
          marginTop: "30px",
          height: "40px",
        }}
        icon={<PlusCircleOutlined />}
      >
        thêm sản phẩm
      </Button>
    </Helmet>
  );
}
