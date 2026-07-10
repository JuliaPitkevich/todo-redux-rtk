import "./style.scss";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span className="error-message__icon">⚠️</span>
      <p className="error-message__text">{message}</p>
      {onClose && (
        <button className="error-message__close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
