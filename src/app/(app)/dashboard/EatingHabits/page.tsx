"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
 
const eatingHabitSchema = z.object({
  meals: z.array(z.object({
    date: z.string().optional(),
    entries: z.array(z.object({
      mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snacks']).optional(),
      mealTime: z.string().optional(),
      food: z.string().optional(),
      rating: z.number().min(1).max(10).optional(),
      frequency: z.number().min(1).optional(),
    })).optional(),
  })),
});
 
type MealEntry = {
  mealType: string;
  mealTime: string;
  food: string;
  rating: number;
  frequency: number;
};

type Meal = {
  date: string;
  entries: MealEntry[];
};

type EatingHabit = {
  _id: string;
  userId: string;
  meals: Meal[];
  createdAt: string;
  updatedAt: string;
};

const Home: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user._id; 
  const [habits, setHabits] = useState<EatingHabit[]>([]);
  const { toast } = useToast();

  
  const form = useForm({
    resolver: zodResolver(eatingHabitSchema),
    defaultValues: {
      meals: [
        {
          date: new Date().toISOString().split("T")[0],
          entries: [
            { mealType: "Breakfast", mealTime: " 10:21", food: " rice", rating: 1, frequency: 1 },
            { mealType: "Lunch", mealTime: " 09:21", food: " vegetables", rating: 1, frequency: 1 },
            { mealType: "Dinner", mealTime: " 11:31", food: " eggs", rating: 1, frequency: 1 },
            { mealType: "Snacks", mealTime: " 02:21", food: " bread", rating: 1, frequency: 1 },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    const fetchEatingHabits = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/getEatingHabit/?userId=${userId}`);
          if (response.data.success) {
            setHabits(response.data.data);
          } else {
            toast({ title: "Error fetching habits", description: response.data.message });
          }
        } catch (error) {
          toast({ title: "Error", description: "Failed to fetch eating habits" });
        }
      }
    };

    fetchEatingHabits();
  }, [userId, toast]);

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    
    try {
      const response = await axios.post("/api/postEatingHabit/", {
        userId,
        meals: data.meals,
      });

      if (response.data.success) {
        toast({ title: "Success", description: "Eating habits saved!" });
        setHabits((prev) => [...prev, response.data.data]); // Ensure type consistency
      } else {
        console.error("Error saving habits:", response.data);
        toast({ title: "Error saving habits", description: response.data.message, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error saving habits:", error);
      toast({ title: "Error", description: "Failed to save eating habits", variant: "destructive" });
    }
  };
  // if (!session) {
  //   return <div>You must be logged in</div>;
  // }
  
  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Your Eating Habits</h2>
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Meal Type</TableHead>
      <TableHead>Meal Time</TableHead>
      <TableHead>Food</TableHead>
      <TableHead>Rating</TableHead>
      <TableHead>Frequency</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {habits.length > 0 ? (
      habits.flatMap(habit =>
        habit.meals.map((meal) =>
          meal.entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(meal.date).toLocaleDateString()}</TableCell>
              <TableCell>{entry.mealType}</TableCell>
              <TableCell>{entry.mealTime}</TableCell>
              <TableCell>{entry.food}</TableCell>
              <TableCell>{entry.rating}</TableCell>
              <TableCell>{entry.frequency}</TableCell>
            </TableRow>
          ))
        )
      )
    ) : (
      <TableRow>
        <TableCell colSpan={6}>No data available</TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>


      <h2 className="text-3xl font-bold mb-6">Log Your Eating Habits</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-8">
  {form.watch("meals").map((meal, index) => (
    <div key={index} className="mb-6">
      <h3 className="text-xl mb-4 font-bold">Meal on {meal.date}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {meal.entries.map((entry, entryIndex) => (
          <React.Fragment key={entryIndex}>
            <div>
              <label className="font-semibold">Meal Type</label>
              <Input {...form.register(`meals.${index}.entries.${entryIndex}.mealType`)} placeholder="Meal Type" />
            </div>

            <div>
              <label className="font-semibold">Meal Time</label>
              <Input type="time" {...form.register(`meals.${index}.entries.${entryIndex}.mealTime`)} />
            </div>

            <div>
              <label className="font-semibold">Food</label>
              <Input {...form.register(`meals.${index}.entries.${entryIndex}.food`)} placeholder="Food" />
            </div>

            <div>
              <label className="font-semibold">Rating (1-10)</label>
              <Input type="number" {...form.register(`meals.${index}.entries.${entryIndex}.rating`)} min={1} max={10} />
            </div>

            <div>
              <label className="font-semibold">Frequency</label>
              <Input type="number" {...form.register(`meals.${index}.entries.${entryIndex}.frequency`)} min={1} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ))}
  <Button type="submit" className="w-full">Submit Eating Habits</Button>
</form>

    </div>
  );
};

export default Home;
