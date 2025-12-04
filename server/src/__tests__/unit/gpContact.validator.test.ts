import { CreateGpContactSchema } from "@validators/gpContact.validator";

describe("GP Contact Validator - Unit Tests", () => {
  describe("CreateGpContactSchema", () => {
    it("should validate correct GP contact data", () => {
      const validData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      };

      const result = CreateGpContactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept GP contact without contact number", () => {
      const validData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
      };

      const result = CreateGpContactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject GP name less than 3 characters", () => {
      const invalidData = {
        gpName: "AB",
        email: "anna@gmail.com",
      };

      const result = CreateGpContactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "GP Name must be at least 3 characters"
        );
      }
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        gpName: "Soho Square General Practice",
        email: "invalid-email",
      };

      const result = CreateGpContactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email format");
      }
    });

    it("should reject contact number without country code", () => {
      const invalidData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "78876 0233",
      };

      const result = CreateGpContactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject contact number less than 12 characters", () => {
      const invalidData = {
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 123",
      };

      const result = CreateGpContactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
