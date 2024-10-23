import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Meal';
export const COLLECTION_NAME = 'meals';

export interface MealEntry {
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    mealTime: string;
    food: string;
    rating: number;
    frequency: number;
}

export interface Meal extends Document {
    userId: Types.ObjectId;
    meals: {
        date: Date;
        entries: MealEntry[];
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const MealEntrySchema = new Schema<MealEntry>(
    {
        mealType: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
            required: true,
        },
        mealTime: {
            type: String,
            required: true,
        },
        food: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        frequency: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const MealSchema = new Schema<Meal>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User', 
        },
        meals: [
            {
                date: { type: Date, required: true },
                entries: [MealEntrySchema],
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true, 
    }
);

MealSchema.index({ userId: 1 });

export const MealModel = model<Meal>(DOCUMENT_NAME, MealSchema, COLLECTION_NAME);
