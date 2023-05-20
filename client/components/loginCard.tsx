import styles from "../styles/components/loginCard.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] 
  title: string
}

export default function LoginCard({ title, children }: Props) {
  return (
    <div className={ styles.card }>
      <h4 className={ styles.title }>{ title }</h4>
      { children }
    </div>
  )
}