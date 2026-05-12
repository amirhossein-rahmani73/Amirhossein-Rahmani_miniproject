import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import styles from "../styles/RegistrationPage.module.css";

function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async () => {
    setMessage("");
    
    if (username && password && password === passwordConfirm) {
      const { response, error } = await register(username, password);
      
      if (response) {
        setMessage("ثبت نام با موفقیت انجام شد.");
        navigate("/login");
      }
      if (error) {
        setMessage("کاربر با این نام وجود دارد! نام دیگری انتخاب کنید.");
        setUsername("");
        setPassword("");
        setPasswordConfirm("");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3>بوت کمپ بوتواستارت</h3>
      <div className={styles.form}>
        <img src="Union.png" alt="logo" />
        <p>فرم ثبت نام</p>
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
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="تکرار رمز عبور"
        />
        <button onClick={submitHandler}>ثبت نام</button>
        <Link to="/login">حساب کاربری دارید؟</Link>
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

export default RegistrationPage;
