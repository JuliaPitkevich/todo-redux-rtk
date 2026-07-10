import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../rtk/slices/todosSlice";
import TodoForm from "../TodoForm";
import Button from "../../shared/Button";

const ItemEdit = ({ task, onCancel }) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (data) => {
    setIsSaving(true);
    dispatch(
      updateTodo({
        id: task.id,
        todoData: data,
      }),
    ).finally(() => {
      setIsSaving(false);
      onCancel();
    });
  };

  return (
    <div className="todo-item__edit">
      <TodoForm
        initialData={task}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        submitText="Save"
        isSubmitting={isSaving}
      />
    </div>
  );
};

export default ItemEdit;
