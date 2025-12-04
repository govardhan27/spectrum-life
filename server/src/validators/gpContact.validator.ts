import { z } from "zod";

export const CreateGpContactSchema = z.object({
  gpName: z
    .string()
    .min(1, "GP Name is required")
    .min(3, "GP Name must be at least 3 characters")
    .max(100, "GP Name must not exceed 100 characters")
    .trim(),

  email: z.string().email("Invalid email format").trim(),

  contactNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+[\d\s\-\(\)]+$/.test(val),
      "Contact Number must start with + followed by country code (e.g., +353 78876 0233)"
    )
    .refine(
      (val) => !val || val.length >= 12,
      "Contact Number must include country code and be at least 12 characters"
    )
    .refine(
      (val) => !val || val.length <= 20,
      "Contact Number must not exceed 20 characters"
    ),
});

export const UpdateGpContactSchema = CreateGpContactSchema.partial();

export type CreateGpContactInput = z.infer<typeof CreateGpContactSchema>;
export type UpdateGpContactInput = z.infer<typeof UpdateGpContactSchema>;
