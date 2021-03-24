import React from "react"

import styles from "./styles.module.scss"

const Button = ({ children, onClick, style, disabled }) => {
  return (
    <button
      className={styles.mainButton}
      style={{
        ...{
        }, ...style,
      }}
      disabled={disabled}
      onClick={(evt) => {
          onClick(evt);
      }}
    >
      {children}
    </button>
  );
}

export default Button
