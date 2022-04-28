import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthValue } from "../../../contexts/AuthContext";
import userApi from "../../../Api/userApi";
import ForgotPassword from "../ForgotPassword";
import ReactLoading from "react-loading";
import "./index.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuthValue();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isShowModalForgot, setIsShowModalForgot] = useState(false);

  const setIsShowModal = () => {
    setIsShowModalForgot(true);
  };

  const closeModal = () => {
    setIsShowModalForgot(false);
  };

  const login = (e) => {
    e.preventDefault();
    userApi.login(email, password).then((res) => {
      const { data } = res;
      if (data.length === 0) {
        setError("Verify Email or Password");
        alert("Verify Email or Password");
        enqueueSnackbar("Sai tài khoản hoặc mật khẩu");
        return;
      } else {
        const user = data[0];
        if (user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
        <ReactLoading type={"balls"} color={"blue"} height={100} width={100} />;
        enqueueSnackbar("Đăng nhập thành công");
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="center">
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>TechFE</h1>
            <p>Mang công nghệ tới mọi nhà</p>
          </div>
        </div>
        <div className="right">
          <h1>Login</h1>
          {error && <div className="auth__error">{error}</div>}
          <form onSubmit={login} name="login_form">
            <input
              type="email"
              value={email}
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account?
            <Link to="/register">Create one here</Link>
          </p>
          <p onClick={setIsShowModal}>Forgot password</p>
          {isShowModalForgot && (
            <ForgotPassword
              openModal={isShowModalForgot}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
