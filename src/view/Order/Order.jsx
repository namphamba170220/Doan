import React, { useEffect, useState } from "react";
import { Table, Tooltip, Button } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import orderApi from "../../Api/orderApi";
function Order() {
  const [productList, setProductList] = useState(null);
  useEffect(() => {
    console.log("productList", productList);
  }, [productList]);
  useEffect(() => {
    orderApi.getAll().then((res) => {
      const { data } = res;
      const finalData = data.map((item) => {
        const { productCardDetai } = item;
        const resuilt = productCardDetai.map((CardDetai) => {
          return {
            ...item.infoUserData,
            ...CardDetai,
          };
        });
        return resuilt;
      });
      setProductList(finalData.flat());
    });
  }, []);

  const onSubmitOrder = () => {
    console.log("Submit");
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address 1",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: "Sản phẩm mua",
      dataIndex: "title",
      key: "title",
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      ellipsis: {
        showTitle: false,
      },
      render: (color) => (
        <Tooltip placement="topLeft" title={color}>
          {color}
        </Tooltip>
      ),
    },
    {
      title: "Phiên bản RAM",
      dataIndex: "version",
      key: "version",
      ellipsis: {
        showTitle: false,
      },
      render: (version) => (
        <Tooltip placement="topLeft" title={version}>
          {version}
        </Tooltip>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: {
        showTitle: false,
      },
      render: (quantity) => (
        <Tooltip placement="topLeft" title={quantity}>
          {quantity}
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "150",
      render: (item) => (
        <div className="d-flex">
          <Tooltip title="Submit">
            <Button
              onClick={onSubmitOrder(item)}
              type="text"
              className="d-flex justify-content-center align-items-center"
              icon={<CheckSquareOutlined />}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return <Table sticky={true} columns={columns} dataSource={productList} />;
}

export default Order;
