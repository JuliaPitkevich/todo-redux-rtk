import { useDispatch, useSelector } from "react-redux";
import { getTodos, createTodo, clearErrors } from "../../rtk/slices/todosSlice";
import Logout from "../../components/Logout";
import ErrorMessage from "../../components/ErrorMessage";
import TodoMainContent from "../../components/TodoMainContent";
import TodoFilter from "../../components/TodoFilter";
import TodoForm from "../../components/TodoForm";
import "./style.scss";

const Todos = () => {
  const { userName } = useSelector((state) => state.auth);
  const { serverError } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleCloseError = () => {
    dispatch(clearErrors());
  };

  const handleCreate = (todoData) => {
    dispatch(
      createTodo({
        title: todoData.title,
        description: todoData.description,
      }),
    );
  };

  return (
    <div className="todos">
      <header className="todos__header">
        <div className="todos__header-left">
          <h1 className="title">Your Tasks{userName && `, ${userName}`}</h1>
        </div>
        <Logout />
      </header>

      {serverError && (
        <div className="todos__error">
          <ErrorMessage message={serverError} onClose={handleCloseError} />
        </div>
      )}

      <div className="todos__content">
        <aside className="todos__sidebar">
          <TodoForm onSubmit={handleCreate} />
          <TodoFilter />
        </aside>

        <TodoMainContent />
      </div>
    </div>
  );
};

export default Todos;
