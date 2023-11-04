const errorHandler = async (err, req, res, next) => {
  try {
    // console.log(err, 3);
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((error) => error.message);
      res.status(400).json({ errors });
    }
    if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ errors: ["Invalid company id"] });
    }
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ errors: ["Email already exists"] });
    }
    if (err.name === "SequelizeDatabaseError") {
      res.status(400).json({ errors: ["Invalid input"] });
    }
    if (err.name === "SequelizeConnectionError") {
      res.status(500).json({ errors: ["Internal Server Error"] });
    }
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ errors: ["Invalid Token"] });
    }
    if (err.message === "Company id cannot be empty") {
      res.status(400).json({ errors: ["Company id cannot be empty"] });
    }
    if (err.message === "Unauthorized") {
      res.status(401).json({ errors: ["You are not authorized"] });
    }
    if (err.message === "Not Found") {
      res.status(404).json({ errors: ["Not Found"] });
    }
    if (err.message === "Forbidden") {
      // console.log(err, 22);
      res.status(403).json({ errors: ["You are not allowed to access this"] });
    }
    if (err.message === "Bad Request") {
      res.status(400).json({ errors: ["Bad Request"] });
    }
    if (err.message === "Job not found") {
      res.status(404).json({ errors: ["Job not found"] });
    }
    if (err.name === "Company not found") {
      res.status(404).json({ message: err.message });
    }
    if (err.message === "Invalid password") {
      res.status(401).json({ message: err.message });
    }
    if (err.message === "Password must be at least 6 characters") {
      res.status(400).json({ message: err.message });
    }
    if (err.message === "password and username cannot be empty") {
      res.status(400).json({ message: err.message });
    }
    if (err.message === "password and email cannot be empty") {
      res.status(400).json({ message: err.message });
    }
    if (err.message === "Company id cannot be empty") {
      res.status(400).json({ message: err.message });
    }
    if (err.message === "User not found") {
      res.status(404).json({ message: err.message });
    }
    if (err.message === "Invalid email or password") {
      res.status(401).json({ message: err.message });
    }
    if (err.message === "Image file cannot be empty") {
      res.status(400).json({ message: err.message });
    }
    if (err.message === "Image not found") {
      res.status(404).json({ message: err.message });
    }
    if (err.message === "Email is required") {
      res.status(401).json({ message: err.message });
    }
    if (err.message === "Password is required") {
      res.status(401).json({ message: err.message });
    }
    if (err.message === "Not Found email") {
      res.status(404).json({ message: err.message });
    }
    if (err.message === "Incorrect password") {
      res.status(404).json({ message: err.message });
    }
    res.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = errorHandler;
