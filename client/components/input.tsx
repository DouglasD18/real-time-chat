import styles from "../styles/components/input.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] 
} 

export default function Input(props: Props) {
  return (
    <input className={ styles.input } {...props} />
  )
}