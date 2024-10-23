import { NextResponse } from 'next/server';


const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = ""
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
