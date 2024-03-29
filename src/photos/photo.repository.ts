import { EntityRepository, Repository } from 'typeorm';
import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  createPhoto(photoName: string): Promise<Photo> {
    const photo = new Photo();
    photo.name = photoName;

    return photo.save();
  }
}
