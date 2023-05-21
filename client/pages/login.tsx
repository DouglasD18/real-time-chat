import { ChangeEvent, useState } from "react";
import styles from "../styles/pages/login.module.css";
import Link from "next/link";

import Button from "../components/button";
import Input from "../components/input";
import LoginCard from "../components/loginCard";

export default function LoginPage() {
  const [formData, setFormaData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleFormData = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormaData({
      ...formData,
      [name]: e.target.value
    })
  }

  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title="Faça seu Login">
        <form className={ styles.form }>
        <Input
            type="text"
            placeholder="Seu e-mail:"
            value={ formData.email }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => { handleFormData(e, "email") } }
            />
          <Input
            type="password"
            placeholder="Sua senha:"
            value={ formData.password }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => { handleFormData(e, "password") } }
          />
          <Button>Login</Button>
          <p className={ styles.p }>Ainda não possui conta? {" "}<Link href="/cadastro" className={ styles.link }>Cadastrar</Link></p>
        </form>
      </LoginCard>
    </div>
  )
}
