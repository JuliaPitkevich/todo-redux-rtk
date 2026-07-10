import Button from "../../shared/Button";

const AuthToggle = ({ isLogin, onToggle }) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      fullWidth
      onClick={onToggle}
    >
      {isLogin
        ? "Don't have an account? Register"
        : "Already have an account? Login"}
    </Button>
  );
};

export default AuthToggle;
