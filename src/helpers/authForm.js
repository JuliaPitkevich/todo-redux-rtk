export const FIELDS_CONFIG = {
  email: {
    label: "Email",
    type: "text",
  },
  password: {
    label: "Password",
    type: "password",
  },
  name: {
    label: "Name",
    type: "text",
  },
};

export const getFieldNames = (isLogin) => {
  return isLogin ? ["email", "password"] : ["email", "password", "name"];
};

export const getInitialState = (names) =>
  names.reduce((acc, name) => ({ ...acc, [name]: "" }), {});
