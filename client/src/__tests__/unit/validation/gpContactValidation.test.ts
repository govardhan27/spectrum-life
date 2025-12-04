import { gpContactSchema } from "@components/forms/GPContactForm/validation";

describe("gpContactSchema", () => {
  describe("gpName", () => {
    it("requires gpName", () => {
      const result = gpContactSchema.safeParse({
        gpName: "",
        email: "anna@gmail.com",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("GP Name is required");
      }
    });

    it("requires minimum 3 characters", () => {
      const result = gpContactSchema.safeParse({
        gpName: "AB",
        email: "anna@gmail.com",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "GP Name must be at least 3 characters"
        );
      }
    });

    it("accepts valid gpName", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("email", () => {
    it("requires valid email format", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "invalid-email",
      });

      expect(result.success).toBe(false);
    });

    it("accepts valid email", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("contactNumber", () => {
    it("accepts empty contactNumber", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "",
      });

      expect(result.success).toBe(true);
    });

    it("requires + prefix when provided", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "353789760233",
      });

      expect(result.success).toBe(false);
    });

    it("accepts valid international format", () => {
      const result = gpContactSchema.safeParse({
        gpName: "Soho Square General Practice",
        email: "anna@gmail.com",
        contactNumber: "+353 78876 0233",
      });

      expect(result.success).toBe(true);
    });
  });
});
