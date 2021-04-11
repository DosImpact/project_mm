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
  BannerByNameOutput,
  DeleteBannerInput,
  DeleteBannerOutput,
} from './dtos/query-banners.dtos';
import { Banner, BannerItem } from './entities/banner.entity';

@Injectable()
export class BannersService {
  private readonly S3_FOLDER: string = 'banner';
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
    const path = `${this.S3_FOLDER}/${bannerName}`;
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
  async bannerByName({
    bannerName,
  }: BannerByNameInput): Promise<BannerByNameOutput> {
    try {
      const banner = await this.bannersRepo.findOneOrFail({
        where: { bannerName },
      });
      return {
        ok: true,
        banner,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find banner by ${bannerName}`,
      };
    }
  }
  async deleteBanners({
    bannerName,
  }: DeleteBannerInput): Promise<DeleteBannerOutput> {
    try {
      // check banner by name
      const res = await this.bannerByName({ bannerName });
      if (!res.ok || !res.banner) {
        return res;
      }
      // (delete S3)
      // delete DB
      const removeres = await this.bannersRepo.softRemove(res.banner);
      console.log(removeres);

      return { ok: true };
    } catch (error) {
      this.logger.error(`Cannot soft delete banner [DB] ${bannerName}`);
      return {
        ok: false,
        error: `Cannot soft delete banner [DB] ${bannerName}`,
      };
    }
  }

  async hardDeleteBanners({
    bannerName,
  }: DeleteBannerInput): Promise<DeleteBannerOutput> {
    try {
      // check banner by name
      const res = await this.bannerByName({ bannerName });
      if (!res.ok || !res.banner) {
        return res;
      }
      // delete S3
      const banner = res.banner;
      await Promise.all(
        banner.images.map(async (img) => {
          const res = await this.uploadService.deleteS3(img.key);
          if (!res.ok) throw Error('cannot delete S3');
        }),
      );
      // delete DB
      await this.bannersRepo.delete({ bannerName });

      return { ok: true };
    } catch (error) {
      this.logger.error(`Cannot delete banner [S3|DB] ${bannerName}`);
      return {
        ok: false,
        error: `Cannot delete banner [S3|DB] ${bannerName}`,
      };
    }
  }
}
