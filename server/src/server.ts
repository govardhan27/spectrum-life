import "dotenv/config";
import { db } from "@config/database";
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await db.$connect();
    console.log("Database connected successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Health check at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n Shutting down gracefully...");
  await db.$disconnect();
  console.log("Database disconnected");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n Shutting down gracefully...");
  await db.$disconnect();
  console.log("Database disconnected");
  process.exit(0);
});

startServer();
