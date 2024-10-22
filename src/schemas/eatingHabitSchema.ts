import { z } from 'zod';

const mealEntrySchema = z.object({
  mealType: z.string().min(1, { message: 'Meal Type is required' }),
  mealTime: z.string().min(1, { message: 'Meal Time is required' }),
  food: z.string().min(1, { message: 'Food is required' }).regex(/[A-Za-z\s]+/, {
    message: 'Food must contain only letters and spaces',
  }),
  rating: z.number().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
  frequency: z.number().min(1, { message: 'Frequency must be at least 1' }),
});

const mealSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  entries: z.array(mealEntrySchema),
});

export const eatingHabitSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  meals: z.array(mealSchema),
});
