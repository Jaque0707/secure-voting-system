import type {
  ReactNode,
} from "react";

import "./ui.css";


interface CardProps {

  children: ReactNode;

  className?: string;

  padding?: "small" | "medium" | "large";
}


export default function Card({
  children,
  className = "",
  padding = "medium",
}: CardProps) {

  const classes = [
    "ui-card",
    `ui-card-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <section className={classes}>
      {children}
    </section>
  );
}