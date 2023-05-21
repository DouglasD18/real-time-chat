import { ChangeEvent } from "react";
import styles from "../styles/components/input.module.css";

type Props = {
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} 

export default function Input(props: Props) {
  return (
    <input className={ styles.input } {...props} required />
  )
}