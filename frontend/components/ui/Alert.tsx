import type {
  ReactNode,
} from "react";

import "./ui.css";


type AlertType =
  | "success"
  | "error"
  | "warning"
  | "info";


interface AlertProps {

  type?: AlertType;

  children: ReactNode;

  title?: string;
}


export default function Alert({
  type = "info",
  title,
  children,
}: AlertProps) {

  return (
    <div
      className={`ui-alert ui-alert-${type}`}
      role={
        type === "error"
          ? "alert"
          : "status"
      }
    >

      <div className="ui-alert-icon">

        {type === "success" && "✓"}

        {type === "error" && "!"}

        {type === "warning" && "!"}

        {type === "info" && "i"}

      </div>


      <div className="ui-alert-content">

        {title && (
          <strong>
            {title}
          </strong>
        )}

        <div>
          {children}
        </div>

      </div>

    </div>
  );
}