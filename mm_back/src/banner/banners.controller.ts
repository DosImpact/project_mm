import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('banners')
export class BannersController {
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('create2')
  @UseInterceptors(FilesInterceptor('files'))
  async createBanners(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
  }
}
