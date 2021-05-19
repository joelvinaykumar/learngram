import { IsDateString, IsEnum, IsString, IsUrl } from 'class-validator';

import { VideoType } from '../video.enum';

export class VideoDto {
  @IsString()
  title: string;

  @IsUrl()
  storage_url: string;

  @IsString()
  content_type: string;

  @IsString()
  user_id: string;

  @IsDateString()
  created_at: string;
}
