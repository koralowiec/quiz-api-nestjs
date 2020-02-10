import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotosService } from './photos.service';
import { extname } from 'path';

@Controller()
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('/:id')
  async getPhotoById(
    @Param('id', ParseIntPipe) photoId: number,
    @Res() res,
  ): Promise<any> {
    const photo = await this.photosService.getPhoto(photoId);
    res.sendFile(photo.name, { root: './files' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createPhoto(@UploadedFile() file) {
    return this.photosService.createPhoto(file.filename);
  }
}
