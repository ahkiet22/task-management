const taskRoutes = require("./task.route");
const authRoutes = require("./auth.route");
const { authMiddleware } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/tasks", authMiddleware, taskRoutes);

  app.use(version + "/auth", authRoutes);
};
