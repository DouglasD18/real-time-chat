import styles from "../styles/components/button.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] 
  isDisabled: boolean
  disabledClass: string
} 

export default function Button({ children, isDisabled, disabledClass }: Props) {

  return (
    <button disabled={ isDisabled } className={ `${styles.button} ${styles[disabledClass]}` } >{ children }</button>
  )
}