import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  CreateUserOutput,
  DeleteUserInput,
  DeleteUserOutput,
  UpdateUserInput,
  UpdateUserOutput,
} from './dtos/mutation-user.dtos';
import {
  UpdateProfileInput,
  UpdateProfileOutput,
} from './dtos/mutations-profile.dtos';
import {
  GetUserByEmailInput,
  GetUserByEmailOutput,
  GetUserByIdInput,
  GetUserByIdOutput,
  SearchUserInput,
} from './dtos/query-user.dtos';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';

const logger = new Logger('UsersService');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepo: Repository<Profile>,
    @InjectRepository(Verification)
    private readonly VerificationsRepo: Repository<Verification>,
  ) {
    logger.debug('UsersService init');
  }

  // Query | 아이디로,이메일로  단일 유저 , 이메일로 여러 유저 검색 ( like 사용 )
  async getUserById({ id }: GetUserByIdInput): Promise<GetUserByIdOutput> {
    try {
      const user = await this.usersRepo.findOneOrFail(id);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find user by id : ${id}`,
      };
    }
  }
  async getUserByEmail({
    email,
  }: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
    try {
      const user = await this.usersRepo.findOneOrFail({ where: { email } });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: `cannot find user by email : ${email}`,
      };
    }
  }
  async searchUsers({ term, page }: SearchUserInput) {
    try {
    } catch (error) {}
  }

  // Mutation
  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      // 이메일 중복 검사
      const exist = await this.usersRepo.findOne({
        email: createUserInput.email,
      });
      if (exist) return { ok: false, error: 'email already taken' };
      const user = await this.usersRepo.save(
        this.usersRepo.create(createUserInput),
      );
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot create User',
      };
    }
  }
  async updateUser(updatedUser: UpdateUserInput): Promise<UpdateUserOutput> {
    try {
      const { user } = await this.getUserById({ id: updatedUser.id });
      if (updatedUser.email) user.email = updatedUser.email;
      if (updatedUser.username) user.username = updatedUser.username;
      if (updatedUser.password) user.password = updatedUser.password;
      // profile객체 업데이트도 필요
      if (updatedUser.profile) {
        await this.UpdateProfile({ user, ...updatedUser.profile });
      }
    } catch (error) {
      return {
        ok: false,
        error: 'cannot update User',
      };
    }
  }

  async deleteUser({ id }: DeleteUserInput): Promise<DeleteUserOutput> {
    try {
      const { user } = await this.getUserById({ id });
      await this.usersRepo.softRemove(user);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: `cannot delete user id ${id} ` };
    }
  }

  // Profile Updaet
  async UpdateProfile({
    bio,
    user,
  }: UpdateProfileInput): Promise<UpdateProfileOutput> {
    try {
      const profile = await this.profilesRepo.findOneOrFail({
        where: { user },
      });
      if (bio) profile.bio = bio;
      await this.profilesRepo.save(profile);
      return {
        ok: true,
        profile,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot update User Profile',
      };
    }
  }
}
