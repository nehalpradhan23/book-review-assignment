const validate = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (name.length <= 3) {
    return res.status(400).json({
      success: false,
      message: "Name must be more than 3 characters",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password.length <= 5) {
    return res.status(400).json({
      success: false,
      message: "Password must be more than 5 characters",
    });
  }

  next();
};

export default validate;
