import styles from "../styles/pages/login.module.css";

import Button from "../components/button";
import Input from "../components/input";
import LoginCard from "../components/loginCard";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Login">
        <form className={ styles.form }>
          <Input type="text" placeholder="Seu e-mail:" />
          <Input type="password" placeholder="Sua senha:" />
          <Button>Login</Button>
          <p style={{ textAlign: "center" }}>Ainda não possui conta? {" "}<Link href="/cadastro">Cadastrar</Link></p>
        </form>
      </LoginCard>
    </div>
  )
}
