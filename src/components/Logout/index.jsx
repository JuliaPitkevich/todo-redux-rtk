import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../rtk/slices/authSlice";
import "./style.scss";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetAuth());
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
export default Logout;
