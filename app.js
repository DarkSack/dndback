import createError from "http-errors";
import express from "express";
import routes from "./utils/routesHandler.js";
import plugins from "./utils/pluginsHandler.js";
const app = express();

plugins.forEach(({ plugin, options }) => {
  app.use(options ? plugin(options) : plugin());
});

routes.forEach(({ path, handler }) => {
  app.use(path, handler);
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
