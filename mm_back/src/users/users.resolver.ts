import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}
}
