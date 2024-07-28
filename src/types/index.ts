import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
