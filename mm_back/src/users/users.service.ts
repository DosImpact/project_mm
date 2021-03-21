import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const logger = new Logger('UsersService');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {
    logger.debug('UsersService init');
  }

  // Query | 아이디로,이메일로  단일 유저 , 이메일로 여러 유저 검색 ( like 사용 )
  async getUserById() {}
  async getUserByEmail() {}
  async getUsersByTerms() {}

  // Mutation

  async createUser() {}
  async updateUser() {}
  async deleteUser() {}
}
