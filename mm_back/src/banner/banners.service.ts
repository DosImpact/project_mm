import { UploadService } from '@/uploads/uploads.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateBannerInput } from './dtos/mutation-banners.dtos';
import {
  BannerByNameInput,
  DeleteBannerInput,
} from './dtos/query-banners.dtos';

// ? 배너라는 버킷 / 홈배너 버킷을 만들고 / 이 아래 파일들을 저장하고 싶다.
// ? 배너/홈배너 버킷의 내용들을 싹다 읽고싶다. , 혹은 하나만
// ? 배너/홈내버 버킷 내용중 특정 key값에 대한 value(파일) 을 update , delete하고 싶다.

@Injectable()
export class BannersService {
  private readonly path: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService,
  ) {
    this.path = 'banner';
  }

  async createBanners(
    files: Express.Multer.File,
    { bannerName }: CreateBannerInput,
  ) {
    const path = `${this.path}/${bannerName}`;
    try {
      console.log(files[2], bannerName);
      const res = await this.uploadService.uploadS3(files[2], path);
      console.log(res);
      return res;
    } catch (error) {}
    return 'ok';
  }
  async bannerByName(bannerByNameInput: BannerByNameInput) {}
  async deleteBanners(deleteBannerInput: DeleteBannerInput) {}
}
