// pages/api/eatingHabit/post.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects';
import EatingHabitModel from '@/model/EatingHabit';
import { EatingHabitSchema } from '@/schemas/eatingHabitSchema';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    console.log("Received Body:", body);

    // Validate the incoming data using Zod schema
    const validation = EatingHabitSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.format();
      console.error("Validation Errors:", errors); // Log detailed validation errors
      return NextResponse.json(
        {
          success: false,
          message: 'Validation errors',
          errors,
        },
        { status: 400 }
      );
    }

    console.log("Validated Data:", validation.data);

    const newEatingHabit = new EatingHabitModel({
      userId: validation.data.userId,
      meals: validation.data.meals,
    });

    // Save to the database
    const savedHabit = await newEatingHabit.save();

    console.log("Saved Eating Habit:", savedHabit);

    return NextResponse.json(
      {
        success: true,
        data: savedHabit,
      },
      { status: 201 }
    );
  } catch (error) {
    // Improved error handling with specific messages
    console.error('Error saving eating habit:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Error saving habit',
      },
      { status: 500 }
    );
  }
}
