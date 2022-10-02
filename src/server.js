const http = require("http");
const app = require("./app");

// normalize the port, return a valid port number
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (
    error.code // list of error.code possible: https://nodejs.org/api/errors.html#errors_common_system_errors
  ) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    case "ECONNREFUSED":
      console.error(bind + " connection is refused.");
      process.exit(1);
      break;
    case "ECONNRESET":
      console.error(bind + " connection as been reset by a peer.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // create the server

// listeners
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("✅ Listening on " + bind);
});

server.listen(process.env.PORT || 3000);
