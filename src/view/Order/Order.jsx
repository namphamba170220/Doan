import { CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import orderApi from "../../Api/orderApi";
import ConfirmPopup from "../../components/ConfirmPopup/index";
import ModalOrder from "./ModalOrder";
function Order() {
  const [productList, setProductList] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openModalDeleteProjects, setOpenModalDeleteProjects] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = useState(null);

  const onShowModal = (item) => {
    return () => {
      setIsShowModal(true);
    };
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const showDeleteConfirm = (id) => {
    setId(id);
    setOpenModalDeleteProjects(true);
  };

  const handelDeleteProduct = (check) => {
    if (check && id) {
      orderApi.remove(id).then((res) => {
        setTimeout(() => {
          enqueueSnackbar("Success");
        }, 500);
        setOpenModalDeleteProjects(false);
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
      });
    } else {
      setOpenModalDeleteProjects(false);
    }
  };

  useEffect(() => {}, [productList]);
  useEffect(() => {
    orderApi.getAll().then((res) => {
      const { data } = res;

      const finalData = data.map((item) => {
        const { productCardDetai } = item;

        const resuilt = productCardDetai.map((CardDetai) => {
          return {
            ...CardDetai,
            ...item.infoUserData,
            id: item.id,
          };
        });
        return resuilt;
      });
      setProductList(finalData.flat());
    });
  }, []);

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
      render: (version, index) => (
        <Tooltip placement="topLeft" title={version} key={index}>
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
      render: (quantity, index) => (
        <Tooltip placement="topLeft" title={quantity} key={index}>
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
              onClick={onShowModal(item)}
              type="text"
              className="d-flex justify-content-center align-items-center"
              icon={<CheckSquareOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title={"delete"}>
            {" "}
            <Button
              type="text"
              onClick={() => showDeleteConfirm(item.id)}
              className="d-flex justify-content-center align-items-center"
              icon={<DeleteOutlined />}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table sticky={true} columns={columns} dataSource={productList} />
      {isShowModal && (
        <ModalOrder openModal={isShowModal} onClose={closeModal} />
      )}
      <ConfirmPopup
        onConfirm={handelDeleteProduct}
        visibleModal={openModalDeleteProjects}
      />
    </>
  );
}

export default Order;
