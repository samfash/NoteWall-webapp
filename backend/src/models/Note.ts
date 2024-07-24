import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Note = model('Note', noteSchema);
