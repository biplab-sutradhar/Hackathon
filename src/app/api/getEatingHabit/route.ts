
import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects';
import EatingHabitModel from '@/model/EatingHabit';

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: 'User ID is required',
      },
      { status: 400 }
    );
  }

  try {
    const userData = await EatingHabitModel.find({ userId });

    if (userData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No data found for this user',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching user data',
      },
      { status: 500 }
    );
  }
}
