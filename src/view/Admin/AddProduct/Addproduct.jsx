import { Form, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import productApi from '../../../Api/productApi';
import showNotification from '../../../components/Notification';
import { SubTitle } from '../../../components/SubTitle';
import ButtonSubmission from '../../../components/ButtonSubmission/index';
function Addproduct(openModal,onClose,projectDetail) {
    const [form] = Form.useForm();
    const onSubmit = (data) => {
        const body = {
            id: projectDetail?.id ?? null,
            title: data?.title,
            price: data?.price,
            image01:data?.image01,
            image02:data?.image02,
            categoryslug:data?.categoryslug,
            color:data?.colors,
            slug:data?.slug,
            version:data?.version,
            description: data?.description,
        };
        if(!projectDetail?.id) {
            productApi.createProductApi(body)
            .then((res) => {
                setTimeout(() => {
                    showNotification({type: 'success', noti: 'create'})
                },500);
                onClose();
            })
            .catch((error) => {
                showNotification({ type: '', noti: 'create'});
            });
        } else {
            productApi.updateProductApi(body)
            .then((res) => {
                setTimeout(() => {
                    showNotification({type: 'success', noti: 'update'})
                },500);
                onClose();
            })
            .catch((error) => {
                showNotification({ type: '', noti: 'update'});
            });
        }
    }
  return (
    <div>
        <Modal 
        className="appointment-form-modal"
        visible={openModal}
        onCancel={() => {
            Modal.destroyAll();
            onClose();
        }}
        title={null}
        closable={false}
        footer={null}
        keyboard={true}
        >
            <Form form={form} name="control-ref" onFinish={onSubmit} defaultValue={projectDetail}>
                <SubTitle title={projectDetail ? "Edit" :"add"} onClickClose={onClose}/>
                <div className="appointment--settings-form">
                    <div className="appointment--form-wrapper">
                        <div className="scroll__modal">
                            <div className="appointment--content">
                                <div className="input-form">
                                    <div className="appointment--setting name">
                                        <label className="label-input">
                                        title
                                            <span className="input-mandatory">*</span>
                                        </label>
                                        <Form.Item name="projectName" rules={[{ required: true, message: "validTitle"}]}>
                                            <Input className="appointment--item custom__input" placeholder='enterTitle'/>
                                        </Form.Item>
                                    </div>
                                    <div className="appointment--setting name">
                                        <label className="label-input">
                                           shortName
                                            <span className="input-mandatory">*</span>
                                        </label>
                                        <Form.Item name="projectShortName" rules={[{ required: true, message: 'validShortName' }]}>
                                            <Input className="appointment--item custom__input" placeholder="Please input short name!" />
                                        </Form.Item>
                                    </div>
                                    <div className="appointment--setting description">
                                        <label className="label-input">description</label>
                                        <Form.Item name="description">
                                            <TextArea rows={2} name="description" className="appointment--item custom__input" placeholder='enterLocation' />
                                        </Form.Item>
                                    </div>
                                    <Form.Item shouldUpdate>
                                        {({ getFieldValue }) => {
                                            const isDisabled =
                                                !getFieldValue('projectName') ||
                                                !getFieldValue('projectShortName') ||
                                                !getFieldValue('startDate') ||
                                                !getFieldValue('projectLeader');
                                            return (
                                                <div className="btn-project-submission">
                                                    <ButtonSubmission isEdit={projectDetail?.id} isDisabled={isDisabled} />
                                                </div>
                                            );
                                        }}
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    </div>
  )
}

export default Addproduct