// import { ExclamationOutlined } from "@ant-design/icons";
// import { Modal } from "antd";
// import PropTypes from "prop-types";
// import React from "react";
// import "./index.scss";

// const ConfirmPopup = ({ onConfirm, visibleModal = false }) => {
//   const handleOk = () => {
//     onConfirm(true);
//   };

//   const handleCancel = () => {
//     onConfirm(false);
//   };

//   return (
//     <div>
//       <Modal
//         visible={visibleModal}
//         title={null}
//         closable={false}
//         footer={null}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         maskClosable={false}
//       >
//         <div>
//           <div className="content-confirm">
//             <div className="icon">
//               <ExclamationOutlined className="icon-warning" />
//             </div>
//             <div className="mt-3 confirm-p">Confirm</div>
//             <div className="mt-2 content">Are you sure?</div>
//           </div>
//           <div className="mt-5 d-flex justify-content-center">
//             <button className="mr-3 cancel" onClick={handleCancel}>
//               No
//             </button>
//             <button
//               className="submit-confirm"
//               type="primary"
//               onClick={handleOk}
//             >
//               Yes
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// ConfirmPopup.propTypes = {
//   onConfirm: PropTypes.any,
//   visibleModal: PropTypes.bool,
// };

// export default ConfirmPopup;
