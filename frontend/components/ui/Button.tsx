import type { ButtonHTMLAttributes, ReactNode } from "react";

import "./ui.css";


type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger";


interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: ReactNode;

  variant?: ButtonVariant;

  loading?: boolean;

  loadingText?: string;

  fullWidth?: boolean;
}


export default function Button({
  children,
  variant = "primary",
  loading = false,
  loadingText = "Loading...",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {

  const classes = [
    "ui-button",
    `ui-button-${variant}`,
    fullWidth ? "ui-button-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || loading}
    >

      {loading ? loadingText : children}

    </button>
  );
}