import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Query((returns) => String)
  async me() {
    await this.usersService.createUser();
    return `hello ${this.config.get('MAINTAINER')}`;
  }

  @Query((returns) => String)
  async deluser() {
    await this.usersService.deleteUser();
    return 'ok';
  }
}
