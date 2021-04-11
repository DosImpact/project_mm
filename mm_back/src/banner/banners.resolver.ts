import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BannersService } from './banners.service';
import {
  BannerByNameInput,
  BannerByNameOutput,
  DeleteBannerInput,
  DeleteBannerOutput,
} from './dtos/query-banners.dtos';
import { Banner } from './entities/banner.entity';

@Resolver((of) => Banner)
export class BannersResolver {
  constructor(private readonly bannersService: BannersService) {}
  // create banner - 🔨 how to file upload with graphQL
  // read Banner

  @Query(() => BannerByNameOutput)
  async bannerByName(@Args('input') bannerByNameInput: BannerByNameInput) {
    return this.bannersService.bannerByName(bannerByNameInput);
  }
  // delete Banner
  @Mutation(() => DeleteBannerOutput)
  async deleteBanner(@Args('input') deleteBannerInput: DeleteBannerInput) {
    return this.bannersService.deleteBanners(deleteBannerInput);
  }
}
