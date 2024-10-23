"use client"
import { useEffect, useState } from "react";
import { MoodAreaChart } from "./(components)/MoodAreaChart";
import MoodBar from "./(components)/moodbar";
import { StressAnxietyBarChart } from "./(components)/anxietyStressBar";


const chartData = [                    // excited - 6
	// happy - 5
	{ day: "Sun", mood: 30 },              //calm -4
	{ day: "Mon", mood: 30 },                 //neutral 3
	{ day: "Tue", mood: 20 },                //anxious - 2
	{ day: "Wed", mood: 10 },                //sad - 1                                        
	{ day: "Thur", mood: 0 },               //angry - 0
	{ day: "Fri", mood: 40 },
	{ day: "Sat", mood: 60 },
]
const res = {
	"assessments": [
		{
			"date": "2024-10-04T12:34:56Z",
			"mood": "sad",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
		{
			"date": "2024-10-05T10:30:00Z",
			"mood": "sad",
			"anxietyLevel": 6,
			"stressLevel": 7
		},
		{
			"date": "2024-10-06T12:34:56Z",
			"mood": "happy",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
		{
			"date": "2024-10-07T12:34:56Z",
			"mood": "happy",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
		{
			"date": "2024-10-08T12:34:56Z",
			"mood": "happy",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
		{
			"date": "2024-10-09T12:34:56Z",
			"mood": "happy",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
		{
			"date": "2024-10-10T12:34:56Z",
			"mood": "happy",
			"anxietyLevel": 3,
			"stressLevel": 5
		},
	]
}
let moodData = 0;
for (let index = 0; index < res.assessments.length; index++) {
	moodData += res.assessments[index].mood == "happy" ? 40 : res.assessments[index].mood == "neutral" ? 30 : res.assessments[index].mood == "sad" ? 20 : res.assessments[index].mood == "angey" ? 10 : 0;
}
const averageMood = moodData / res.assessments.length;
export default function Home() {
	const [data, setData] = useState<{ date: string; stressLevel: number; anxietyLevel: number; mood: string }[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/mental-health-tracking?last7Days=true");
				setData(res.assessments);
				//     if (!response.ok) {
				//       throw new Error("Failed to fetch data");
				//     }
				//     const result = await response.json();
				//     setData(result.assessments); // Pass assessments data to the chart
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="flex flex-col justify-start mx-11 bg">
			<div className="relative">
				<h2 className="font-extrabold text-2xl py-4">Your Mood dashboard</h2>
				<h1 className="font-bold text-xl pb-6">Mood</h1>
				<div>
					<MoodAreaChart apiData={data} />
				</div>
				{/* <h1 className="font-bold text-xl pt-7 ">Your are currently feeling</h1>
				<div className="py-3">
				<MoodBar val={averageMood} />
				</div>
				<h3>{Math.floor((averageMood/60)*100)}% Happy and {100-Math.floor((averageMood/60)*100)}% Sad </h3> */}
				<div className="my-6">
					<StressAnxietyBarChart data={data} />
				</div>
				{/* <h2 className="font-extrabold text-xl py-4">Insights</h2> */}
			</div>
		</div>
	);
}
