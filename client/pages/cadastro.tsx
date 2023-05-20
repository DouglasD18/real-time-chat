import styles from "../styles/pages/login.module.css";
import LoginCard from '../components/loginCard';

export default function CadastroPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard />
    </div>
  )
}
