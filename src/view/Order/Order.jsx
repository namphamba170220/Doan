import { CheckSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tag, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import orderApi from "../../Api/orderApi";
import ConfirmPopup from "../../components/ConfirmPopup/index";
import ModalOrder from "./ModalOrder";
import ReactLoading from "react-loading";
function Order() {
  const [productList, setProductList] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openModalDeleteProjects, setOpenModalDeleteProjects] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = useState(null);
  const [dataOrder, setDataOrder] = useState(null);
  const [done, setDone] = useState(undefined);

  const onShowModal = (item) => {
    return () => {
      setDataOrder(item);
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
        if (res) {
          orderApi.getAll().then((res) => {
            const { data } = res;
            setProductList(data);
          });
          setTimeout(() => {
            enqueueSnackbar("Success");
          }, 500);
          setOpenModalDeleteProjects(false);
        }
      });
    } else {
      setOpenModalDeleteProjects(false);
    }
  };

  const flattenData = (data) => {
    const finalData = data?.map((item) => {
      const { productCardDetai } = item;

      const resuilt = productCardDetai?.map((CardDetai) => {
        return {
          ...CardDetai,
          ...item.infoUserData,
          id: item.id,
        };
      });
      return resuilt;
    });
    return finalData?.flat();
  };

  useEffect(() => {}, [productList]);
  useEffect(() => {
    setTimeout(() => {
      orderApi.getAll().then((res) => {
        const { data } = res;
        setProductList(data);
      });
      setDone(true);
      return () => {};
    }, 2000);
  }, []);

  const columns = [
    {
      title: "H??? v?? t??n",
      dataIndex: "fullname",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "?????a ch???",
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
      title: "S???n ph???m mua",
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
      title: "M??u",
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
      title: "Phi??n b???n RAM",
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
      title: "S??? l?????ng",
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
      title: "Tr???ng th??i ????n h??ng",
      key: "status",
      dataIndex: "status",
      render: (text, item) => {
        return (
          <Tag
            style={{ width: 80, textAlign: "center" }}
            color={item?.status ? "green" : "red"}
          >
            {item?.status ? "Assigned" : "Unassigned"}
          </Tag>
        );
      },
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
      {!done ? (
        <ReactLoading
          type={"bubbles"}
          color={"blue"}
          height={100}
          width={100}
        />
      ) : (
        <>
          {" "}
          <Table
            sticky={true}
            columns={columns}
            dataSource={flattenData(productList)}
          />
          {isShowModal && (
            <ModalOrder
              openModal={isShowModal}
              onClose={closeModal}
              dataOrder={dataOrder}
              fullData={productList}
              setProductList={setProductList}
            />
          )}
          <ConfirmPopup
            onConfirm={handelDeleteProduct}
            visibleModal={openModalDeleteProjects}
          />
        </>
      )}
    </>
  );
}

export default Order;
