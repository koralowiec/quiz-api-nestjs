import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoRepository])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
