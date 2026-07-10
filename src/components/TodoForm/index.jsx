import { useState, useEffect } from "react";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { validateForm } from "../../helpers/validator";
import "./style.scss";

const TodoForm = ({ initialData, onSubmit, onCancel }) => {
  const initialState = { title: "", description: "" };
  const isEditing = !!initialData;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleErrorChange = (name, error) => {
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newErrors, isFormValid } = validateForm(formData, [
      "title",
      "description",
    ]);
    setFormErrors((prev) => ({ ...prev, ...newErrors }));
    if (!isFormValid) return;

    if (isEditing) {
      onSubmit({
        title: formData.title,
        description: formData.description,
        completed: initialData.completed,
      });
    } else {
      onSubmit(formData);
    }

    if (!isEditing) {
      setFormData(initialState);
      setFormErrors(initialState);
    }
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <h3 className="subtitle">{isEditing ? "Edit task:" : "Create task:"}</h3>
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={formErrors.title}
        onErrorChange={handleErrorChange}
        validateOnBlur={isEditing}
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required={false}
        error={formErrors.description}
        onErrorChange={handleErrorChange}
      />
      <div className="todo-form__actions">
        <Button
          type="submit"
          variant="success"
          size={isEditing ? "sm" : "md"}
          fullWidth={!isEditing}
        >
          {isEditing ? "Update" : "Add Task"}
        </Button>
        {isEditing && (
          <Button
            variant="danger"
            size={onCancel ? "sm" : "md"}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
