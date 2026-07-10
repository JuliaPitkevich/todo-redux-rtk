import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Auth from "./pages/auth";
import Todos from "./pages/todos";
import NotFound from "./pages/notFound";
import PrivateRoute from "./components/PrivateRoute";
import { token } from "./helpers/token";

function App() {
  useEffect(() => {
    const handlePageHide = () => {
      token.remove();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={token.isAuthorized() ? "/todos" : "/auth"} replace />
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/todos" element={<Todos />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
