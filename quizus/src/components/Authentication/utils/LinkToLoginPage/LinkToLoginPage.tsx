import { Link } from "react-router-dom";
import styles from "./LinkToLoginPage.module.css";

export default function LinkToLoginPage() {
  return <Link className={styles.main} to="/"></Link>;
}
