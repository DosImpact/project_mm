import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {
    (async () => {
      console.log('userSerivce init');
    })();
  }

  async createUser() {
    try {
      const user = await this.usersRepo.save(
        this.usersRepo.create({
          name: 'testUser',
        }),
      );
      console.log('result user', user);
    } catch (error) {
      console.log('cannot create user');
    }
  }

  async deleteUser() {
    try {
      const user = await this.usersRepo.findOne({
        where: { name: 'testUser' },
      });
      const res = await this.usersRepo.softRemove(user);
      console.log(res);
    } catch (error) {
      console.log('cannot delete User');
    }
  }
}
