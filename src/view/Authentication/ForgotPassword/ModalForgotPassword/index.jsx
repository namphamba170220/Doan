import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../../../Api/userApi";
import emailjs from "emailjs-com";
function ModalForgotPassword() {
  const { email } = useParams();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const hanldeSubmit = () => {
    userApi.getUserWithForgot(email).then((res) => {
      const { data } = res;
      if (data.length === 0) {
        alert("Tài khoản chưa tồn tại");
        return;
      } else {
        const user = data[0];
        if (user.codeResetPass === input) {
          emailjs
            .send(
              "service_qyfe7we",
              "template_13c3fdh",
              {
                message: `Password : ${user.password}`,
              },
              "QO8zHHMpHDDpzlYYc"
            )
            .then(
              (result) => {
                console.log(result.text);
                navigate("/login");
              },
              (error) => {
                console.log(error.text);
              }
            );
        }
        return;
      }
    });
  };
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={hanldeSubmit}>Submit</button>
    </>
  );
}

export default ModalForgotPassword;
