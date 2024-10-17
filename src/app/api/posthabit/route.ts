import { mentalHealthTrackingSchema } from '@/schemas/mentalHealthTrackingSchema';
import dbConnect from '@/libs/dbConnects';
import MentalHealthTrackingModel from '@/model/mentalHealthTracking';
import UserModel from '@/model/User';  

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    const result = mentalHealthTrackingSchema.safeParse(body);
    console.log('New tracking entry data:', result.data);

    if (!result.success) {
      const errors = result.error.format();
      return Response.json(
        {
          success: false,
          message: 'Validation errors',
          errors,
        },
        { status: 400 }
      );
    }
 
    const userExists = await UserModel.findById(result.data.userId); 
    if (!userExists) {
      return Response.json(
        {
          success: false,
          message: 'User does not exist',
        },
        { status: 404 }
      );
    }

    const newTrackingEntry = new MentalHealthTrackingModel(result.data);
    
    // Save to the database
    await newTrackingEntry.save();

    return Response.json(
      {
        success: true,
        data: newTrackingEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving mental health tracking:', error);
    return Response.json(
      {
        success: false,
        message: 'Error saving entry',
      },
      { status: 500 }
    );
  }
}
