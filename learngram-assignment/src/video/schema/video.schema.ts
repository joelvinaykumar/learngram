import { Schema } from 'mongoose';

export const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  storage_url: {
    type: String,
    unique: true,
    required: true
  },
  content_type: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
}, {
  versionKey: false,
});