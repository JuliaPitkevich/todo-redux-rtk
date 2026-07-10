export const validators = {
  required: (value, fieldName = "Field") => {
    if (!value.trim()) return `${fieldName} is required`;
  },

  email: (value) => {
    validators.required(value, "Email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  },

  password: (value) => {
    validators.required(value, "Password");
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (value.length > 50) {
      return "Password must be less than 50 characters";
    }
    return "";
  },

  name: (value) => {
    validators.required(value, "Name");
    if (value.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (value.length > 50) {
      return "Name must be less than 50 characters";
    }
    return "";
  },

  title: (value) => {
    validators.required(value, "Title");
    if (value.length < 3) {
      return "Title must be at least 3 characters";
    }
    if (value.length > 100) {
      return "Title must be less than 100 characters";
    }
    return "";
  },

  description: (value) => {
    if (value && value.length > 500) {
      return "Description must be less than 500 characters";
    }
    return "";
  },
};

export const validateForm = (data, fields) => {
  const newErrors = {};
  let hasError = false;

  fields.forEach((field) => {
    const error = validators[field]?.(data[field]);
    if (error) {
      newErrors[field] = error;
      hasError = true;
    }
  });
  return { newErrors, isFormValid: !hasError };
};
