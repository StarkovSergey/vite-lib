import { ComponentProps } from "react"
import s from "./card.module.scss"

export const Card = (props: ComponentProps<"div">) => {
  return <div className={s.card} {...props} />
}
