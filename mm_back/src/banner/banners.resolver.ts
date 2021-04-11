import { Resolver } from '@nestjs/graphql';
import { Banner } from './entities/banner.entity';

@Resolver((of) => Banner)
export class BannersResolver {
  // create banner - 🔨 how to file upload with graphQL
  // read Banner
  // delete Banner
}
