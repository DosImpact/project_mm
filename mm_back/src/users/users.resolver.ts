import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  constructor(private readonly config: ConfigService) {}

  @Query((returns) => String)
  me() {
    return `hello ${this.config.get('MAINTAINER')}`;
  }
}
