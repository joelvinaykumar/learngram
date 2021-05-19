import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoSchema } from './schema/video.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name : "Video", schema : VideoSchema }
    ]),
    MulterModule.register({
      limits: {
        fieldSize: 25 * 1024 *1024,
      }
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
