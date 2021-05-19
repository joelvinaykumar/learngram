import { Document } from 'mongoose';

export interface Video extends Document{
  readonly title: string;
  readonly storage_url: string;
  readonly content_type: string;
  readonly user_id: string;
  readonly created_at: string;
}
