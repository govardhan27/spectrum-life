import request from "supertest";
import app from "@/app";

describe("GP Contact API - Integration Tests", () => {
  describe("POST /api/v1/gp-contacts", () => {
    it("should create a new GP contact with all fields", async () => {
      const newContact = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      };

      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(newContact)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        gpName: newContact.gpName,
        email: newContact.email,
        contactNumber: newContact.contactNumber,
      });
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });

    it("should create a new GP contact without contact number", async () => {
      const newContact = {
        gpName: "Dublin Medical Center",
        email: "contact@dublinmedical.ie",
      };

      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(newContact)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        gpName: newContact.gpName,
        email: newContact.email,
      });
      expect(response.body.data.contactNumber).toBeNull();
    });

    it("should return 400 for invalid GP name (too short)", async () => {
      const invalidContact = {
        gpName: "AB",
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(invalidContact)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
      expect(response.body.errors).toBeDefined();
    });

    it("should return 400 for invalid email format", async () => {
      const invalidContact = {
        gpName: "Valid GP Name",
        email: "invalid-email",
      };

      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(invalidContact)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should return 409 for duplicate email", async () => {
      const contact = {
        gpName: "First Practice",
        email: "duplicate@example.com",
      };

      // Create first contact
      await request(app).post("/api/v1/gp-contacts").send(contact).expect(201);

      // Try to create duplicate
      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(contact)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Email already exists");
    });

    it("should return 400 for invalid contact number format", async () => {
      const invalidContact = {
        gpName: "Valid GP Name",
        email: "valid@example.com",
        contactNumber: "123456789",
      };

      const response = await request(app)
        .post("/api/v1/gp-contacts")
        .send(invalidContact)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
