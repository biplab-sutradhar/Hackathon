import mongoose, { Schema, Document } from 'mongoose';

export interface MentalHealthAssessment {
  date: Date;
  mood: 'happy' | 'sad' | 'angry' | 'neutral';
  anxietyLevel: number;  
  stressLevel: number;   
  socialInteraction: 'very social' | 'neutral' | 'withdrawn';
  sleepQuality: 'very good' | 'good' | 'average' | 'poor';
  appetiteChanges: 'no change' | 'decreased' | 'increased';
  isFeelingSafe: boolean;
  additionalNotes?: string;
}

export interface MentalHealthTracking extends Document {
  userId: string;
  assessments: MentalHealthAssessment[];
  createdAt: Date;
  updatedAt: Date;
}

const MentalHealthTrackingSchema: Schema<MentalHealthTracking> = new Schema({
  userId: { type: String, required: true },
  assessments: [
    {
      date: { type: Date, required: true },
      mood: { type: String, enum: ['happy', 'sad', 'angry', 'neutral'], required: true },
      anxietyLevel: { type: Number, min: 0, max: 10, required: true },
      stressLevel: { type: Number, min: 0, max: 10, required: true },
      socialInteraction: { type: String, enum: ['very social', 'neutral', 'withdrawn'], required: true },
      sleepQuality: { type: String, enum: ['very good', 'good', 'average', 'poor'], required: true },
      appetiteChanges: { type: String, enum: ['no change', 'decreased', 'increased'], required: true },
      isFeelingSafe: { type: Boolean, required: true },
      additionalNotes: { type: String, default: "" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const MentalHealthTrackingModel =
  mongoose.models.MentalHealthTracking ||
  mongoose.model<MentalHealthTracking>('MentalHealthTracking', MentalHealthTrackingSchema);

export default MentalHealthTrackingModel;
