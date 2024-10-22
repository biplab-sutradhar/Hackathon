// schemas/eatingHabitSchema.ts
import { z } from 'zod';

const MealEntrySchema = z.object({
    mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snacks']),
    mealTime: z.string().min(1, { message: 'Meal Time is required' }),
    food: z.string().min(1, { message: 'Food is required' }),
    rating: z.number().min(1).max(10),
    frequency: z.number().min(1),
});

export const EatingHabitSchema = z.object({
    userId: z.string().min(1, { message: 'User ID is required' }),
    meals: z.array(
        z.object({
            date: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }),
            entries: z.array(MealEntrySchema),
        })
    ),
});
