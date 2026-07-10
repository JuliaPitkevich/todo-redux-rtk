import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../rtk/slices/todosSlice";
import Button from "../../shared/Button";
import "./style.scss";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todos.filter);

  const filters = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "⏳ Active" },
    { value: "completed", label: "✅ Completed" },
  ];

  return (
    <div className="todo-filter">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "primary" : "secondary"}
          size="sm"
          onClick={() => dispatch(setFilter(filter.value))}
          className="todo-filter__btn"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilter;
