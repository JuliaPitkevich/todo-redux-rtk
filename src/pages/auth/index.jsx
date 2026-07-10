import { useState } from "react";
import { authUser } from "../../rtk/slices/authSlice";
import { useSelector } from "react-redux";
import Loading from "../../shared/Loading";
import AuthForm from "../../components/AuthForm";
import AuthToggle from "../../components/AuthToggle";
import "./style.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { isLoading } = useSelector((store) => store.auth);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        {isLoading && <Loading text="Authenticating..." />}
        <h1 className="title">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>
        <AuthForm isLogin={isLogin} />
        <AuthToggle isLogin={isLogin} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default Auth;
