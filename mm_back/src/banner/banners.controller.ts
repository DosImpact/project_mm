import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BannersService } from './banners.service';
import { CreateBannerInput } from './dtos/mutation-banners.dtos';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  // header :{Content-Type:multipart/form-data}
  // interceptors 는 files라는 키값을 가진 데이터를 body에서 가로챈다.
  // @Body 에는 나머지 데이터만 남게 된다.
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createBanner(
    @UploadedFiles() files: Express.Multer.File,
    @Body() body: CreateBannerInput,
  ) {
    return this.bannersService.createBanners(files, body);
  }

  @Post('create2')
  @UseInterceptors(FilesInterceptor('files'))
  async createBanners(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
  }
}
