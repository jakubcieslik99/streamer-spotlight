import { Schema, model } from 'mongoose';
import IStreamer from '../types/IStreamer.js';

const streamerSchema = new Schema<IStreamer>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    platform: { type: String, required: true },
    image: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const streamerModel = model<IStreamer>('Streamer', streamerSchema);
export default streamerModel;
