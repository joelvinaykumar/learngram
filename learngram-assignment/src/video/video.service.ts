import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VideoDto } from './dto/video.dto';
import { Video } from './interfaces/video.interface';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel("Video")
    private readonly videoModel: Model<Video>,
  ){}
  
  async create(input: VideoDto, email: string) {
    const newVideo = new this.videoModel({
      user_id: email,
      ...input
    });
    return await newVideo.save();
  }

  async findAll(email: string) {
    try {
      return this.videoModel.find({ user_id: email });
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  async findOne(id: string) {
    return await this.videoModel.findById(id);
  }

  async update(id: string, input: Partial<VideoDto>) {
    return await this.videoModel.findByIdAndUpdate(id, input);
  }

  async remove(id: string) {
    return await this.videoModel.findByIdAndDelete(id);
  }
}
