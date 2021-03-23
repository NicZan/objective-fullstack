import React from "react"

import "./styles.scss"

const Button = ({ children, onClick, loading, disabled, negative, className, style }) => {
  return (
    <button
      className={`main-button ${disabled ? "disabled" : ""} ${className || ''} ${loading ? 'no-padding' : ''}`}
      style={{
        ...{
          // width: 175
        }, ...style,
      }}
      onClick={(evt) => {
        if (!loading && !disabled) {
          onClick(evt);
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button
