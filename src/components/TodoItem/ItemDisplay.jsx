import Button from "../../shared/Button";

const ItemDisplay = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="todo-item__checkbox"
      />
      <div className="todo-item__display">
        <h3 className="todo-item__title">{task.title}</h3>
        {task.description && (
          <p className="todo-item__description">{task.description}</p>
        )}
      </div>

      <div className="todo-item__actions">
        <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default ItemDisplay;
