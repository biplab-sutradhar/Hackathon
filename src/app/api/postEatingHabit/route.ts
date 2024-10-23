// pages/api/eatingHabit/post.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects';
import EatingHabitModel from '@/model/EatingHabit';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    console.log("Received Body:", body);

    // Directly create a new EatingHabit without validation
    const newEatingHabit = new EatingHabitModel({
      userId: body.userId,
      meals: body.meals,
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
