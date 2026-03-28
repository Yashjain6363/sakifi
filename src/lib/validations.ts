import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254).toLowerCase(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
  website: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;