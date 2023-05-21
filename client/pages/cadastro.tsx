import styles from "../styles/pages/login.module.css";

import LoginCard from '../components/loginCard';
import Input from "../components/input";
import Button from "../components/button";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Cadastro">
        <form className={ styles.form }>
          <Input type="text" placeholder="Seu nome:" />
          <Input type="text" placeholder="Seu e-mail:" />
          <Input type="password" placeholder="Sua senha:" />
          <Button>Cadastrar</Button>
          <p className={ styles.p }>Já possui conta? {" "}<Link href="/login" className={ styles.link }>Login</Link></p>
        </form>
      </LoginCard>
    </div>
  )
}
