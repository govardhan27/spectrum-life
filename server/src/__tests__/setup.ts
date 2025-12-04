import { db } from "@/config/database";

beforeAll(async () => {
  // Connect to test database
  await db.$connect();
});

afterAll(async () => {
  // Clean up and disconnect
  await db.gpContact.deleteMany();
  await db.$disconnect();
});

afterEach(async () => {
  // Clean up after each test
  await db.gpContact.deleteMany();
});

// Force exit after tests complete
process.on("exit", () => {
  db.$disconnect();
});
