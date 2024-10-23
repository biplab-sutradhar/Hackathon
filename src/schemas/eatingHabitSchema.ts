// schemas/eatingHabitSchema.ts
import { z } from 'zod';

const MealEntrySchema = z.object({
    mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snacks']).optional(),
    mealTime: z.string().min(1, { message: 'Meal Time is required' }).optional(),
    food: z.string().min(1, { message: 'Food is required' }).optional(),
    rating: z.number().min(1).max(10).optional(),
    frequency: z.number().min(1).optional(),
});

export const EatingHabitSchema = z.object({
    userId: z.string().min(1, { message: 'User ID is required' }),
    meals: z.array(
        z.object({
            date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }).optional(),
            entries: z.array(MealEntrySchema).optional(),
        })
    ),
});
