import styles from "../styles/components/button.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] 
} 

export default function Button({ children, ...props}: Props) {
  return (
    <button className={ styles.button } {...props}>{ children }</button>
  )
}