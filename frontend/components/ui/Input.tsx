import type {
  InputHTMLAttributes,
} from "react";

import "./ui.css";


interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {

  label: string;

  error?: string;
}


export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {

  const inputId =
    id ||
    `input-${label
      .toLowerCase()
      .replace(/\s+/g, "-")}`;


  return (
    <div className="ui-input-group">

      <label
        htmlFor={inputId}
        className="ui-input-label"
      >
        {label}
      </label>


      <input
        {...props}
        id={inputId}
        className={[
          "ui-input",
          error ? "ui-input-error" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />


      {error && (
        <span className="ui-input-error-text">
          {error}
        </span>
      )}

    </div>
  );
}