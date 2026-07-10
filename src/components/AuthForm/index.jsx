import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, authUser } from "../../rtk/slices/authSlice";
import { validators, validateForm } from "../../helpers/validator";
import {
  FIELDS_CONFIG,
  getFieldNames,
  getInitialState,
} from "../../helpers/authForm";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import ErrorMessage from "../../shared/ErrorMessage";
import "./style.scss";

const AuthForm = ({ isLogin }) => {
  const fieldNames = getFieldNames(isLogin);
  const [userData, setUserData] = useState(getInitialState(fieldNames));
  const [formErrors, setFormErrors] = useState(getInitialState(fieldNames));

  const { serverError } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(getInitialState(fieldNames));
    setFormErrors(getInitialState(fieldNames));
    dispatch(clearErrors());
  }, [isLogin]);

  const handleErrorChange = (name, error) => {
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCloseError = () => {
    dispatch(clearErrors());
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newErrors, isFormValid } = validateForm(userData, fieldNames);
    setFormErrors((prev) => ({ ...prev, ...newErrors }));
    if (!isFormValid) return;

    dispatch(authUser(userData))
      .unwrap()
      .then(() => {
        setUserData(getInitialState(fieldNames));
        setFormErrors(getInitialState(fieldNames));
        navigate("/todos");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      {serverError && (
        <ErrorMessage message={serverError} onClose={handleCloseError} />
      )}

      {fieldNames.map((field) => (
        <Input
          key={`${field}-${isLogin}`}
          label={FIELDS_CONFIG[field].label}
          name={field}
          value={userData[field] || ""}
          type={FIELDS_CONFIG[field].type}
          onChange={handleChange}
          error={formErrors[field]}
          onErrorChange={handleErrorChange}
        />
      ))}

      <Button variant="primary" size="lg" fullWidth>
        {isLogin ? "Login" : "Register"}
      </Button>
    </form>
  );
};

export default AuthForm;
