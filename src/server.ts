import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";

async function main() {
  const server: Server = app.listen(envVars.PORT, () => {
    console.log(`🚀 Server is running on port ${envVars.PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${envVars.PORT}/api/v1`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
}

main();
