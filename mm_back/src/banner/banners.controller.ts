import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banners')
export class BannersController {
  //create banner
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createBanner(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
