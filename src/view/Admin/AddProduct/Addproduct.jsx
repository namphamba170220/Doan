import { Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../Api/categoryApi";
import colorsApi from "../../../Api/colorsApi";
import productApi from "../../../Api/productApi";
import versionApi from "../../../Api/versionApi";
import { ButtonSubmission } from "../../../components/ButtonSubmission/index";
import { SubTitle } from "../../../components/SubTitle";
const { TextArea } = Input;
const { Option } = Select;
const AddProduct = ({ openModal, onClose, productDetail, onSuccess }) => {
  const [form] = Form.useForm();
  const [categoryData, setCategoryData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [versionData, setVersionData] = useState([]);
  console.log(onSuccess);
  const onSubmit = (data) => {
    const productData = {
      id: data?.id,
      title: data?.title,
      image01: data?.image01,
      image02: data?.image02,
      categoryslug: data?.categoryslug,
      price: data?.price,
      slug: data?.slug,
      colors: data?.colors,
      version: data?.version,
      description: data?.description,
    };
    if (productDetail?.id) {
      productApi
        .update({ ...productData, id: productDetail.id })
        .then((res) => {
          onClose();
          onSuccess();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    } else {
      console.log(productData);
      productApi
        .add(productData)
        .then((res) => {
          onClose();
          onSuccess();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    }
  };

  useEffect(() => {
    categoryApi
      .getAll()
      .then((res) => {
        setCategoryData(res?.data);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    colorsApi
      .getAll()
      .then((res) => {
        setColorData(res?.data);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    versionApi
      .getAll()
      .then((res) => {
        setVersionData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    form.setFieldsValue(productDetail);
  }, [productDetail]);

  return (
    <>
      <Modal
        title={null}
        closable={false}
        centered
        onCancel={() => {
          Modal.destroyAll();
          onClose();
        }}
        footer={null}
        keyboard={true}
        visible={openModal}
        width={500}
      >
        <Form
          form={form}
          onFinish={onSubmit}
          name="control-ref"
          defaultValue={productDetail}
        >
          <SubTitle
            title={productDetail ? "Edit Product" : "Add Product"}
            onClickClose={onClose}
            defaultValue={productDetail}
          />
          <div className="appointment--settings-form">
            <div className="appointment--form-wrapper">
              <div className="scroll__modal">
                <div className="appointment--content">
                  <div className="input-form">
                    <div className="appointment--setting name">
                      <label className="label-input">Title</label>
                      <Form.Item
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "validName",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập tên sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Price</label>
                      <Form.Item
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "validPrice",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập giá sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting img01">
                      <label className="label-input">Image01</label>
                      <Form.Item
                        name="image01"
                        rules={[
                          {
                            required: true,
                            message: "validLink",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập link ảnh sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting img02">
                      <label className="label-input">Image02</label>
                      <Form.Item
                        name="image02"
                        rules={[
                          {
                            required: true,
                            message: "validLink",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập link ảnh sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting category">
                      <label className="label-input">Categoryslug</label>
                      <Form.Item
                        name="categoryslug"
                        rules={[
                          {
                            required: true,
                            message: "validCategory",
                          },
                        ]}
                      >
                        <Select
                          className="appointment--item name"
                          placeholder="selectCategory"
                          allowClear
                        >
                          {categoryData.map((item) => (
                            <Option key={item.id} value={item.categoryslug}>
                              {item.display}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="appointment--setting color">
                      <label className="label-input">Colors</label>
                      <Form.Item
                        name="colors"
                        rules={[
                          {
                            required: true,
                            message: "validColor",
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          style={{ width: "100%" }}
                          placeholder="Select color"
                        >
                          {colorData.map((item) => (
                            <Option key={item.id} value={item.color}>
                              {item.display}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Slug</label>
                      <Form.Item
                        name="slug"
                        rules={[
                          {
                            required: true,
                            message: "validSlug",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập số định dạng sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Version</label>
                      <Form.Item
                        name="version"
                        rules={[
                          {
                            required: true,
                            message: "validVersion",
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          style={{ width: "100%" }}
                          placeholder="Select color"
                        >
                          {versionData.map((item) => (
                            <Option key={item.id} value={item.version}>
                              {item.display}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="appointment--setting description">
                      <label className="label-input">Description</label>
                      <Form.Item name="description">
                        <TextArea
                          rows={2}
                          name="description"
                          className="appointment--item custom__input"
                          placeholder="Mô tả sản phẩm"
                        />
                      </Form.Item>
                      <Form.Item shouldUpdate>
                        <div className="btn-project-submission">
                          <ButtonSubmission isEdit={productDetail?.id} />
                        </div>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
