import styles from "../styles/components/input.module.css";

type Props = {
  type: string
  placeholder: string
} 

export default function Input(props: Props) {
  return (
    <input className={ styles.input } {...props} />
  )
}