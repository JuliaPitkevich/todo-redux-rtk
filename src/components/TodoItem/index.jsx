import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../../rtk/slices/todosSlice";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import ConfirmModal from "../../shared/ConfirmModal";
import ItemDisplay from "./ItemDisplay";
import ItemEdit from "./ItemEdit";
import "./style.scss";

const TodoItem = ({ task }) => {
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
    completed: task.completed,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(task.id));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleDelete = () => setShowConfirm(true);
  const confirmDelete = () => {
    dispatch(deleteTodo(task.id));
    setShowConfirm(false);
  };

  const cancelDelete = () => setShowConfirm(false);

  const handleSaveEdit = () => {
    if (!editData.title.trim()) return;

    dispatch(
      updateTodo({
        id: task.id,
        todoData: {
          title: editData.title,
          description: editData.description,
        },
      }),
    );
    setIsEditing(false);
  };

  return (
    <div
      className={`todo-item ${task.completed ? "todo-item--completed" : ""}`}
    >
      <div className="todo-item__content">
        <div className="todo-item__header">
          {isEditing ? (
            <ItemEdit task={task} onCancel={handleCancelEdit} />
          ) : (
            <ItemDisplay
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete all ${tasks.length} tasks? This action cannot be undone.`}
          confirmText={`Yes, Delete All (${tasks.length})`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default TodoItem;
