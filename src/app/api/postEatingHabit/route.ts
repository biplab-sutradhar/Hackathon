// pages/api/eatingHabit/post.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects';
import EatingHabitModel from '@/model/EatingHabit';
import { eatingHabitSchema } from '@/schemas/eatingHabitSchema';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
 
    console.log("Received Body:", body);
 
    const validation = eatingHabitSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.format();
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

    await newEatingHabit.save();
 
    console.log("Saved EatingHabit:", newEatingHabit);

    return NextResponse.json(
      {
        success: true,
        data: newEatingHabit,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving eating habit:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error saving habit',
      },
      { status: 500 }
    );
  }
}
