import styles from "../styles/pages/cadastro.module.css";
import LoginCard from '../components/loginCard';

export default function CadastroPage() {
  return (
    <div className={ styles.background }>
      <LoginCard />
    </div>
  )
}
