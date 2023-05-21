import styles from "../styles/pages/login.module.css";
import Link from "next/link";

import Button from "../components/button";
import Input from "../components/input";
import LoginCard from "../components/loginCard";

export default function LoginPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Login">
        <form className={ styles.form }>
          <Input type="text" placeholder="Seu e-mail:" />
          <Input type="password" placeholder="Sua senha:" />
          <Button>Login</Button>
          <p className={ styles.p }>Ainda não possui conta? {" "}<Link href="/cadastro" className={ styles.link }>Cadastrar</Link></p>
        </form>
      </LoginCard>
    </div>
  )
}
