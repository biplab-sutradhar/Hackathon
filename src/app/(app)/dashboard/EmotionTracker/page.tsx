'use client'
import Image from 'next/image'
// import image from '@/app/assets/mood.png'
import MoodSearchBar from '../(components)/moodSearch'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useEffect } from 'react'

const emotions = [
  "Happy",
  "Sad",
  "Angry",
  "Neutral"
];

const res = {
  "assessments": [
    {
      "date": "2024-10-10T12:34:56Z",
      "mood": "happy",
      "anxietyLevel": 3,
      "stressLevel": 5
    },
    // ... other mock data
  ]
}

export default function EmotionTracker () {
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [mood, setMood] = useState("");
  const [logData, setLogData] = useState([{}]); // Holds fetched data for the last 7 days
  const [error, setError] = useState(null);

  // Fetch mental health assessment data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mental-health-tracking?last7Days=true'); // Fetch last 7 days data
        if (!response.ok) {
          setLogData(res.assessments);
          return;
        }
        const result = await response.json();
        setLogData(result.assessments); // Store the array of assessments
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  // Function to handle post request whenever mood, anxiety, or stress changes
  const postMentalHealthData = async (updatedData) => {
    try {
      const response = await axios.post('/api/post', updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      console.log('Data successfully posted');
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle mood change
  const handleMoodChange = (newMood) => {
    setMood(newMood);
    const updatedData = {
      assessments: [
        {
          date: new Date(),
          mood: newMood.toLowerCase(), 
          anxietyLevel,
          stressLevel,
        },
      ],
    };
    postMentalHealthData(updatedData);
  };

  // Function to handle anxiety level change
  const handleAnxietyChange = (value) => {
    setAnxietyLevel(value[0]);
    const updatedData = {
      assessments: [
        {
          date: new Date(),
          mood,
          anxietyLevel: value[0],
          stressLevel,
        },
      ],
    };
    postMentalHealthData(updatedData);
  };

  // Function to handle stress level change
  const handleStressChange = (value) => {
    setStressLevel(value[0]);
    const updatedData = {
      assessments: [
        {
          date: new Date(),
          mood,
          anxietyLevel,
          stressLevel: value[0],
        },
      ],
    };
    postMentalHealthData(updatedData);
  };

  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="my-6 mx-4 font-bold text-xl text-gray-800">Mood Log</h2>
      <div className="rounded-md border shadow-md overflow-hidden my-6 bg-white">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Anxiety Level</TableHead>
              <TableHead>Stress Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logData.length > 0 ? (
              logData.map((assessment, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(assessment.date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>{assessment.mood}</TableCell>
                  <TableCell>{assessment.anxietyLevel}</TableCell>
                  <TableCell>{assessment.stressLevel}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col justify-start px-6 mb-6'>
        <h2 className='my-6 font-bold text-xl text-gray-800'>Today's Mood</h2>
        <div className='flex flex-row'>
          {emotions.map((emotion, index) => (
            <Button
              key={index}
              className='mx-2 bg-blue-500 text-white rounded-3xl p-4 hover:bg-blue-600'
              variant='default'
              onClick={() => handleMoodChange(emotion)}
            >
              {emotion}
            </Button>
          ))}
        </div>

        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Anxiety Level</h2>
        <div className='w-full flex items-center '>
          <Slider
            value={[anxietyLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleAnxietyChange}
            className="w-1/2"
          />
          <span className='ml-4 text-lg'>{anxietyLevel}/10</span>
        </div>

        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Stress Level</h2>
        <div className='w-full flex items-center'>
          <Slider
            value={[stressLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleStressChange}
            className="w-1/2"
            
          />
          <span className='ml-4 text-lg'>{stressLevel}/10</span>
        </div>       
      </div>
    </div>
  );
}
