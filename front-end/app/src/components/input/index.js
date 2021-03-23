import React from "react";

import styles from "./styles.scss";

const Input = React.forwardRef(
  ({ style, children, className, onChange, placeholder }, ref) => (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        className={`${styles.input} ${className ? styles[className] : ""}`}
        style={{ ...style }}
      >
        {children}
      </input>
    </div>
  )
);

export default Input;
