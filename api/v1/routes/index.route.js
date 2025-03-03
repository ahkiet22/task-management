const taskRoutes = require("./task.route");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const { authMiddleware } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", authMiddleware, taskRoutes);

  app.use(version + "/auth", authRoutes);

  app.use(version + "/user", authMiddleware, userRoutes);
};
