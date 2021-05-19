import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoDto } from './dto/video.dto';
import { User } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() input: VideoDto, @User() user: any) {
    return this.videoService.create(input, user.email);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: any) {
    return this.videoService.findAll(user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.videoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input: Partial<VideoDto>,
  ) {
    return this.videoService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(id);
  }
}
