import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, { 
      useNewUrlParser:  true,
      useFindAndModify: false,
      useCreateIndex: true
    }),
    AuthModule,
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
