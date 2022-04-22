import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthValue } from "../../../contexts/AuthContext";
import useApi from "../../../Api/userApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuthValue();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const login = (e) => {
    e.preventDefault();
    useApi.login(email, password).then((res) => {
      const { data } = res;
      console.log("res `1", res);
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
        enqueueSnackbar("Đăng nhập thành công");
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  };
  return (
    <div className="center">
      <div className="auth">
        <h1>Log in</h1>
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
          Don't have and account?
          <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
