import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post('')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return this.uploadService.uploadS3(file);
  // }
  // @Post('banner')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadBanner(@UploadedFile() file: Express.Multer.File) {
  //   return this.uploadService.uploadBanner(file, 'banner/home');
  // }
}
