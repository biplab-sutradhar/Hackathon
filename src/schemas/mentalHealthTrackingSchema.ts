import { z } from 'zod';

export const mentalHealthAssessmentSchema = z.object({
  date: z.date(),
  mood: z.enum(['happy', 'sad', 'angry', 'neutral']),
  anxietyLevel: z.number().min(0).max(10),
  stressLevel: z.number().min(0).max(10),
  socialInteraction: z.enum(['very social', 'neutral', 'withdrawn']),
  sleepQuality: z.enum(['very good', 'good', 'average', 'poor']),
  appetiteChanges: z.enum(['no change', 'decreased', 'increased']),
  isFeelingSafe: z.boolean(),
  additionalNotes: z.string().optional(),
});

export const mentalHealthTrackingSchema = z.object({
  userId: z.string(),
  assessments: z.array(mentalHealthAssessmentSchema),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});
