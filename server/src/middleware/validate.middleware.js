import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/\d/, 'Password must contain at least one number')
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

export const caseSubmitSchema = z.object({
  contextNote: z.string().max(1000, 'Context note cannot exceed 1000 characters').optional()
});

export const guardianCheckSchema = z.object({
  description: z
    .string()
    .min(10, 'Situation description must be at least 10 characters long')
    .max(2000, 'Description cannot exceed 2000 characters')
});

export const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return res.status(400).json({ error: 'Validation failed', details: formattedErrors });
    }
    next(error);
  }
};
