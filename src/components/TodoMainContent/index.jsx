import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, clearErrors } from "../../rtk/slices/todosSlice";
import Loading from "../../shared/Loading";
import TodoItem from "../TodoItem";
import TodoDeleteAll from "../TodoDeleteAll";
import "./style.scss";

const TodoMainContent = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, filter } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos(filter === "all" ? undefined : filter === "completed"));
  }, [dispatch, filter]);

  const renderContent = () => {
    if (tasks.length === 0) {
      return (
        <div className="todos__empty">
          <p>
            {filter === "all"
              ? "No tasks yet. Create your first task!"
              : filter === "completed"
                ? "No completed tasks yet."
                : "No active tasks."}
          </p>{" "}
        </div>
      );
    }

    return (
      <div className="todos__list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </div>
    );
  };

  return (
    <main className="todos__main">
      <div className="todos__header-bar">
        <div className="todos__stats">
          <span>Total: {tasks.length}</span>
          <span>
            ✅ Completed: {tasks.filter((item) => item.completed).length}
          </span>
          <span>
            ⏳ Active: {tasks.filter((item) => !item.completed).length}
          </span>
        </div>
        <div className="todos__delete-all">
          <TodoDeleteAll />
        </div>
      </div>
      {isLoading && <Loading text="Loading your tasks..." />}
      {renderContent()}
    </main>
  );
};

export default TodoMainContent;
