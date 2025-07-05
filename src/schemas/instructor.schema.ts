import { model, Schema } from 'mongoose';

export interface IInstructor {
  name: string;
}

const InstructorSchema = new Schema<IInstructor>({
  name: { type: String, required: true }
});

export const Instructor = model<IInstructor>('Instructor', InstructorSchema);
