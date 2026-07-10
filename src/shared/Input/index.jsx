import { useState } from "react";
import { validators } from "../../helpers/validator";
import "./style.scss";

const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  onErrorChange,
  type = "text",
  disabled = false,
  required = true,
  className = "",
  validateOnBlur = true,
  ...rest
}) => {
  const validator = validators[name];

  const handleBlur = () => {
    if (validator && onErrorChange && validateOnBlur)
      onErrorChange(name, validator(value));
  };

  const handleChange = (e) => {
    if (error && validator && onErrorChange)
      onErrorChange(name, validator(e.target.value));
    if (onChange) onChange(e);
  };

  return (
    <div className={`input ${className}`}>
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
          {required && <span className="input__label--required">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`input__field ${error ? "input__field--error" : ""}`}
        {...rest}
      />

      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

export default Input;
