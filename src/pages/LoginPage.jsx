import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { setCookie } from "../utils/cookie";
import styles from "../styles/LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async () => {
    setMessage("");
    if (!username || !password) return;

    const { response, error } = await login(username, password);
    
    if (response) {
      setMessage("ورود با موفقیت انجام شد.");
      setCookie(response.data);
      navigate("/admin");
    }
    if (error) {
      setMessage("نام کاربری یا رمز عبور اشتباه است!");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={styles.container}>
      <h3>بوت کمپ بوتواستارت</h3>
      <div className={styles.form}>
        <img src="Union.png" alt="logo" />
        <p>فرم ورود</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="نام کاربری"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
        />
        <button onClick={submitHandler}>ورود</button>
        <Link to="/">ایجاد حساب کاربری!</Link>
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default LoginPage;
