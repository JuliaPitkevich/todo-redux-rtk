import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTodos } from "../../rtk/slices/todosSlice";
import Button from "../../shared/Button";
import ConfirmModal from "../../shared/ConfirmModal";
import "./style.scss";

const TodoDeleteAll = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { tasks, isLoading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    setShowConfirm(true);
  };

  const confirmDeleteAll = () => {
    dispatch(deleteAllTodos());
    setShowConfirm(false);
  };

  const cancelDeleteAll = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={handleDeleteAll}
        disabled={isLoading}
        className="delete-all-btn"
      >
        Delete All
      </Button>

      {showConfirm && (
        <ConfirmModal
          title="Delete All Tasks"
          message={`Are you sure you want to delete all ${tasks.length} tasks? This action cannot be undone.`}
          confirmText={`Yes, Delete All (${tasks.length})`}
          cancelText="Cancel"
          onConfirm={confirmDeleteAll}
          onCancel={cancelDeleteAll}
        />
      )}
    </>
  );
};

export default TodoDeleteAll;
