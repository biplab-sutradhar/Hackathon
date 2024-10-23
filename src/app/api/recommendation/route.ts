import { NextResponse } from 'next/server';


const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = 
    "Create a list of six tasks formatted as a single string. Each task should be separated by '||'. These tasks are for a child to do throughout the day and should be simple, engaging, and encourage learning or play. Avoid anything too complicated, focusing instead on activities that inspire curiosity and imagination. For example, your output should be structured like this: 'Draw your favorite animal and give it a silly hat||Build a fort using pillows and blankets||Find five different things in your house that make interesting sounds and describe them to someone||Write a short story about an imaginary adventure||Create a treasure map and hide something fun for someone to find||Make up a fun new dance move and teach it to someone'. Ensure the tasks are enjoyable, foster creativity, and contribute to a positive and playful day for the child.";
 
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    
    const responseData = await response.json();
 
    const generatedMessage = responseData.candidates[0].content.parts[0].text;

    
    return NextResponse.json({ generatedMessage });
  } catch (error) {
    console.error(' Error making API request:', error);
    throw new Error('Error making API request: ' + error);
  }
}
