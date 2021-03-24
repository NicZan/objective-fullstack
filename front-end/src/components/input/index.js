import React from "react";

import styles from "./styles.module.scss";

const Input = React.forwardRef(
  ({ style, children, className, onChange, placeholder }, ref) => (
    <input
      placeholder={placeholder}
      ref={ref}
      onChange={onChange}
      className={`${styles.input} ${className ? styles[className] : ""}`}
      style={{ ...style }}
    >
      {children}
    </input>
  )
);

export default Input;
