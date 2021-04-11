import { UploadService } from '@/uploads/uploads.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateBannerInput,
  CreateBannerOutput,
} from './dtos/mutation-banners.dtos';
import {
  BannerByNameInput,
  DeleteBannerInput,
} from './dtos/query-banners.dtos';
import { Banner, BannerItem } from './entities/banner.entity';

@Injectable()
export class BannersService {
  private readonly path: string = 'banner';
  private readonly logger = new Logger(BannersService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService,
    @InjectRepository(Banner)
    private readonly bannersRepo: Repository<Banner>,
  ) {}

  async createBanners(
    files: Express.Multer.File,
    { bannerName }: CreateBannerInput,
  ): Promise<CreateBannerOutput> {
    const path = `${this.path}/${bannerName}`;
    try {
      // check exist banner
      let banner = await this.bannersRepo.findOne({ where: { bannerName } });
      if (banner) {
        return {
          ok: false,
          error: 'banner name exist',
        };
      }
      banner = this.bannersRepo.create();
      banner.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
      banner.bannerName = bannerName;
      const tmpImages: BannerItem[] = [];

      // upload part
      for (const key in files) {
        const file: Express.Multer.File = files[key];
        const res = await this.uploadService.uploadS3(file, path);
        if (!res.ok) {
          return { ok: false, error: 'cannot upload S3' };
        }
        const url = new URL(res.url);
        tmpImages.push({
          base_url: url.origin,
          src: res.url,
          key: url.pathname,
        });
      }
      banner.bannerSize = tmpImages.length;
      banner.images = tmpImages;
      await this.bannersRepo.save(banner);
      // save banner
      return {
        ok: true,
        banner: banner,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot create banner',
      };
    }
  }
  async bannerByName(bannerByNameInput: BannerByNameInput) {}
  async deleteBanners(deleteBannerInput: DeleteBannerInput) {}
}
