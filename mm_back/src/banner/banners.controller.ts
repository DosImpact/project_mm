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
  //create banner
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async createBanner(
    @UploadedFiles() files: Express.Multer.File,
    @Body() body: CreateBannerInput,
  ) {
    return this.bannersService.createBanners(files, body);
  }
}
