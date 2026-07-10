import Button from "../Button";
import "./style.scss";

const ConfirmModal = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
}) => {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        <h3 className="confirm-modal__title">{title}</h3>
        <p className="confirm-modal__message">{`Are you sure${message}?`}</p>
        <div className="confirm-modal__actions">
          <Button variant={variant} size="sm" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
