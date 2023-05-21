import styles from "../styles/pages/login.module.css";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

import LoginCard from '../components/loginCard';
import Input from "../components/input";
import Button from "../components/button";

export default function CadastroPage() {
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
      <LoginCard title="Faça seu Cadastro">
        <form className={ styles.form }>
          <Input 
            type="text"
            placeholder="Seu nome:"
            value={ formData.name }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleFormData(e, "name") }
          />
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
          <Button>Cadastrar</Button>
          <p className={ styles.p }>Já possui conta? {" "}<Link href="/login" className={ styles.link }>Login</Link></p>
        </form>
      </LoginCard>
    </div>
  )
}
