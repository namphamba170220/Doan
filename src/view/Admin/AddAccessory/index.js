import { Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import accessoryApi from "../../../Api/accessoryApi";
import categoryAccessoryApi from "../../../Api/categoryAccessoryApi";
import colorsApi from "../../../Api/colorsApi";
import { ButtonSubmission } from "../../../components/ButtonSubmission/index";
import { SubTitle } from "../../../components/SubTitle";
const { TextArea } = Input;
const { Option } = Select;
const AddAccessory = ({
  openModal,
  onClose,
  accessoryDetail,
  onReloadAccessory,
}) => {
  const [form] = Form.useForm();
  const [categoryAccessoryData, setCategoryAccessoryData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const onSubmit = (data) => {
    const AccessoryData = {
      id: data?.id,
      title: data?.title,
      image01: data?.image01,
      image02: data?.image02,
      categoryslug: data?.categoryslug,
      price: data?.price,
      slug: data?.slug,
      colors: data?.colors,
      description: data?.description,
    };
    if (accessoryDetail?.id) {
      accessoryApi
        .update({...AccessoryData, id:accessoryDetail?.id})
        .then((res) => {
          onClose();
          onReloadAccessory();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    } else {
      accessoryApi
        .add(AccessoryData)
        .then((res) => {
          onClose();
          onReloadAccessory();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    }
  };

  useEffect(() => {
    categoryAccessoryApi
      .getAll()
      .then((res) => {
        setCategoryAccessoryData(res?.data);
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
    form.setFieldsValue(accessoryDetail);
  }, [accessoryDetail]);

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
          defaultValue={accessoryDetail}
        >
          <SubTitle
            title={accessoryDetail ? "Edit Accessory" : "Add Accessory"}
            onClickClose={onClose}
            defaultValue={accessoryDetail}
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
                    <div className="appointment--setting name">
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
                    <div className="appointment--setting name">
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
                    <div className="appointment--setting name">
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
                          className="appointment--item category"
                          placeholder="selectCategory"
                          allowClear
                        >
                          {categoryAccessoryData.map((item) => (
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
                          <ButtonSubmission isEdit={accessoryDetail?.id} />
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

export default AddAccessory;
