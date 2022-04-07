// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { notification } from "antd";
// import React from "react";
// import { NOTIFICATION_COLOR } from "../Constants/constants";

// const showNotification = ({ type, noti }) => {
//   const msgSuccess = "notification.success";
//   const msgError = "notification.error";
//   const msgCreate = "notification.create";
//   const msgUpdate = "notification.update";
//   const msgDelete = "notification.delete";

//   const styleIcon = {
//     color: `${
//       type === "success" ? NOTIFICATION_COLOR.success : NOTIFICATION_COLOR.error
//     }`,
//     borderRadius: "50%",
//     background: "white",
//   };

//   const notificationConfig = {
//     top: 64,
//     duration: 3,
//     placement: "topRight",
//     description: `${
//       noti === "update" ? msgUpdate : noti === "create" ? msgCreate : msgDelete
//     } ${type === "success" ? msgSuccess : msgError}`,
//     className: `custom-notification ${
//       type === "success" ? "success" : "error"
//     }`,
//     icon:
//       type === "success" ? (
//         <CheckCircleOutlined style={styleIcon} />
//       ) : (
//         <CloseCircleOutlined style={styleIcon} />
//       ),
//   };

//   {
//     type === "success"
//       ? notification.success(notificationConfig)
//       : notification.error(notificationConfig);
//   }
// };

// export default showNotification;
