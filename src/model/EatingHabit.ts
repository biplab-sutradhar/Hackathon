// models/EatingHabit.js
import mongoose, { Schema, Document } from 'mongoose';

export interface MealEntry {
  mealType: string;
  mealTime: string;
  food: string;
  rating: number;
  frequency: number;
}

export interface Meal {
  date: Date;
  entries: MealEntry[];
}

export interface EatingHabit extends Document {
  userId: string;
  meals: Meal[];
}

const MealEntrySchema = new Schema<MealEntry>({
  mealType: { type: String, required: true },
  mealTime: { type: String, required: true },
  food: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  frequency: { type: Number, required: true },
});

const MealSchema = new Schema<Meal>({
  date: { type: Date, required: true },
  entries: { type: [MealEntrySchema], required: true },
});

const EatingHabitSchema = new Schema<EatingHabit>({
  userId: { type: String, required: true },
  meals: { type: [MealSchema], required: true },  // Ensure 'meals' is an array of meals
}, { timestamps: true });

const EatingHabitModel = mongoose.models.EatingHabit || mongoose.model<EatingHabit>('EatingHabit', EatingHabitSchema);

export default EatingHabitModel;
