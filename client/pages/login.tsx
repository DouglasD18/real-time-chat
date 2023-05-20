import LoginCard from "../components/loginCard";
import styles from "../styles/pages/login.module.css";

export default function LoginPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Login">
        
      </LoginCard>
    </div>
  )
}
