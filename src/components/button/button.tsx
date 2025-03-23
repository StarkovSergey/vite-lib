import { ComponentProps } from "react"
import styles from "./button.module.scss"

export const Button = (props: ComponentProps<"button">) => {
  return <button className={styles.button} {...props}></button>
}
