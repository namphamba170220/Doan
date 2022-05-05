import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../../../Api/userApi";
import { useSnackbar } from "notistack";
import { useAuthValue } from "../../../contexts/AuthContext";
import "./index.scss";
const Resgister = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { setCurrentUser } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    userApi.getAll().then((res) => {
      if (res.data.length > 0) {
        const isHaveAccountWithSameEmail = res.data.some(
          (item) => item.email === email
        );
        if (!isHaveAccountWithSameEmail) {
          if (validatePassword()) {
            userApi.register(email, password, fullName).then((res) => {
              const { data } = res;
              if (data.length === 0) {
                setError("Sai mật khẩu");
                enqueueSnackbar("Sai tài khoản hoặc mật khẩu");
                return;
              } else {
                navigate("/");
                setCurrentUser(data);
                enqueueSnackbar("Đăng ký thành công");
                localStorage.setItem("user", JSON.stringify(data));
              }
            });
          }
        }
      } else {
        enqueueSnackbar("Tài khoản đã được đăng ký");
      }
    });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="center">
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>TechFE</h1>
            <p>Đăng ký tài khoản để thỏa thích mua sắm tại TechFE</p>
          </div>
        </div>
        <div className="right">
          <h1>Register</h1>
          {error && <div className="auth__error">{error}</div>}
          <form onSubmit={register} name="registration_form">
            <input
              type="fullName"
              value={fullName}
              placeholder="Enter your fullName"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              value={confirmPassword}
              required
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Register</button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Resgister;
