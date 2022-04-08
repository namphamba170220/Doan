import { Form, Input, Modal } from "antd";
import React from "react";
import { SubTitle } from "../../../components/SubTitle";
import {ButtonSubmission} from "../../../components/ButtonSubmission/index";
const { TextArea } = Input;
const AddProduct = ({ visible, onClose, projectDetail }) => {
    const [form] = Form.useForm();
  return (
    <>
      <Modal
        title={null}
        closable={false}
        centered
        footer={null}
        keyboard={true}
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
        width={500}
      >
        <Form form={form}>
          <SubTitle title="Add product" onClickClose={onClose} defaultValue={projectDetail}/>
          <div className="appointment--settings-form">
            <div className="appointment--form-wrapper">
              <div className="scroll__modal">
                <div className="appointment--content">
                  <div className="input-form">
                    <div className="appointment--setting name">
                      <label className="label-input">Title</label>
                      <Form.Item
                        name="name"
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
                        name="img01"
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
                        name="img02"
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
                        name="category"
                        rules={[
                          {
                            required: true,
                            message: "validCategory",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập phân loại sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Colors</label>
                      <Form.Item
                        name="color"
                        rules={[
                          {
                            required: true,
                            message: "validColor",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập màu sản phẩm"
                        />
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
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập phiên bản sản phẩm"
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
                          <ButtonSubmission isEdit={projectDetail?.id} />
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
