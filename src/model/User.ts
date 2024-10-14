import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  role: 'parent' | 'educator' | 'child'; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'],
  },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['parent', 'educator', 'child'], required: true },  
 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
