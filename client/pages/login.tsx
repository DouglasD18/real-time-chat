import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/pages/login.module.css";

const LOGIN_TEXT = "Ainda não possui conta? ";
const CADASTRO_TEXT = "Já possui conta? ";
const SERVER_ROUTE = process.env.SERVER_ROUTE || "http://localhost:3001/api/users";

import Button from "../components/button";
import Input from "../components/input";
import LoginCard from "../components/loginCard";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [formData, setFormaData] = useState({
    name: "",
    cpf: "",
    password: ""
  });
  const [userExists, setUserExists] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const title = userExists ? "Faça seu Login" : "Faça seu Cadastro";

  const handleFormData = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormaData({
      ...formData,
      [name]: e.target.value
    })
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response;

      if (userExists) {
        response = await fetch(SERVER_ROUTE + "/login", {
          method: "GET",
          body: JSON.stringify(formData)
        })

      } else {
        response = await fetch(SERVER_ROUTE + "/login", {
          method: "POST",
          body: JSON.stringify(formData)
        });
      }

      setFormaData({
        name: "",
        cpf: "",
        password: ""
      });
      console.log(response);

      const token = await response.json();
      if (response.status !== 201 && response.status !== 200) throw new Error(token);

      sessionStorage.setItem('authorization', token);
      router.push("/");
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(error);
      setError(message);
    }
  }

  return (
    <div className={ `${styles.background} ${styles.card}` }>
      <LoginCard title={ title }>
        <form onSubmit={ (e: FormEvent<HTMLFormElement>) => handleForm(e) }  className={ styles.form }>
          { !userExists && <Input 
            type="text"
            placeholder="Seu nome:"
            value={ formData.name }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleFormData(e, "name") }
          /> }
          <Input
            type="text"
            placeholder="Seu cpf:"
            value={ formData.cpf }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => { handleFormData(e, "cpf") } }
            />
          <Input
            type="password"
            placeholder="Sua senha:"
            value={ formData.password }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => { handleFormData(e, "password") } }
          />
          <Button>{ userExists ? "Login" : "Cadastrar" }</Button>
          {error && <p className={ styles.error }>{ error }</p>}
          <p className={ styles.p }>{ userExists ? LOGIN_TEXT : CADASTRO_TEXT }<a onClick={() => setUserExists(!userExists) } className={ styles.link }>{ userExists ? "Cadastrar" : "Login" }</a></p>
        </form>
      </LoginCard>
    </div>
  )
}
