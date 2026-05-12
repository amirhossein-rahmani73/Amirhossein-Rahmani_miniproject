import { Link } from "react-router-dom";
import styles from "../styles/404Page.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <img src="../404.jpg" alt="Page not found" />
      <p>صفحه مورد نظر یافت نشد!</p>
      <Link to="/">بازگشت به صفحه ثبت نام</Link>
    </div>
  );
}

export default NotFoundPage;
