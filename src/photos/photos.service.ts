import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) {}

  async getPhoto(photoId: number) {
    const photo = await this.photoRepository.findOne({ id: photoId });

    if (!photo) {
      throw new NotFoundException(`Photo with id: ${photoId} not found`);
    }

    return photo;
  }

  createPhoto(photoName: string): Promise<Photo> {
    return this.photoRepository.createPhoto(photoName);
  }
}
