import styles from "../styles/pages/login.module.css";

import LoginCard from '../components/loginCard';
import Input from "../components/input";
import Button from "../components/button";

export default function CadastroPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Cadastro">
        <form className={ styles.form }>
          <Input type="text" placeholder="Seu nome:" />
          <Input type="text" placeholder="Seu e-mail:" />
          <Input type="password" placeholder="Sua senha:" />
          <Button>Cadastrar</Button>
        </form>
      </LoginCard>
    </div>
  )
}
