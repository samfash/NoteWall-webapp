import { Request, Response } from 'express';
import { Note } from '../models/Note';

interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.id;
  try {
    const note = new Note({ title, content, userId });
    await note.save();
    res.status(201).json(note);
  } catch (error:unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error:unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error:unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};
