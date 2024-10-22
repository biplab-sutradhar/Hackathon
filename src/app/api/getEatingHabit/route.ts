
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects'; 
import EatingHabitModel from '@/model/EatingHabit';

export async function GET() {
  await dbConnect();
  try {
    const habits = await EatingHabitModel.find({});
    return NextResponse.json({ success: true, data: habits }, { status: 200 });
  } catch (error) {
    console.error('Error fetching eating habits:', error);
    return NextResponse.json({ success: false, message: 'Error fetching habits' }, { status: 500 });
  }
}
