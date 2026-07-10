import "./style.scss";

const Button = ({
  children,
  type = "submit",
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const classNames = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--fullwidth",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
