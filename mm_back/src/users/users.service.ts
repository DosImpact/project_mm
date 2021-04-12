import { JwtService } from '@/jwt/jwt.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import {
  CreateUserInput,
  CreateUserOutput,
  DeleteUserInput,
  DeleteUserOutput,
  LoginUserInput,
  LoginUserOuput,
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
  SearchUserByEmailInput,
  SearchUserByEmailOutput,
} from './dtos/query-user.dtos';
import { Bio, Profile } from './entities/profile.entity';
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
    private readonly verificationsRepo: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  // Query | 아이디로,이메일로 단일 유저 , 이메일로 여러 유저 검색 ( like 사용 )
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
  async getUsers() {
    try {
      const [users, usersCount] = await this.usersRepo.findAndCount({
        relations: ['profile'],
      });
      return { ok: true, users, usersCount };
    } catch (error) {
      return { ok: false };
    }
  }
  async searchUsersByEmail({
    page,
    searchTerm,
  }: SearchUserByEmailInput): Promise<SearchUserByEmailOutput> {
    // page(==1), searchTerm 은 null일수도 있다.
    const pageElement = 5;
    try {
      // searchTerm이 없는 경우
      if (!searchTerm) {
        const { users, ok, usersCount } = await this.getUsers();
        return {
          ok,
          users,
          totalEntity: usersCount,
          totalPage: Math.ceil(usersCount / pageElement),
        };
      }
      // searchTerm - Email
      const [users, usersCount] = await this.usersRepo.findAndCount({
        where: {
          email: Raw((email) => `${email} ILIKE '%${searchTerm}%'`),
        },
        relations: ['profile'],
        skip: (page - 1) * pageElement,
        take: pageElement,
      });
      return {
        ok: true,
        users,
        totalEntity: usersCount,
        totalPage: Math.ceil(usersCount / pageElement),
      };
    } catch (error) {
      logger.error('cannot searchUsersByEmail', error);
      return {
        ok: false,
        error: 'cannot searchUsersByEmail',
      };
    }
  }

  async loginUser({
    email,
    password,
  }: LoginUserInput): Promise<LoginUserOuput> {
    try {
      const user = await this.usersRepo.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'cannot find email',
        };
      }
      const isCorrect = await user.checkPassword(password);
      if (!isCorrect) {
        return {
          ok: false,
          error: 'password is wrong',
        };
      } else {
        const token = this.jwtService.sign({ id: user.id });
        return {
          ok: true,
          token,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: 'cannot login user',
      };
    }
  }

  // TODO
  async findPasswordUser() {}

  // Mutation

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      // 이메일 중복 검사, 프로필, Verification 생성
      const exist = await this.usersRepo.findOne({
        email: createUserInput.email,
      });
      if (exist) return { ok: false, error: 'email already taken' };

      // create user
      const user = await this.usersRepo.save(
        this.usersRepo.create(createUserInput),
      );
      const profile = await this.profilesRepo.save(
        this.profilesRepo.create({ user, bio: Bio.NoComment }),
      );
      await this.verificationsRepo.save(
        this.verificationsRepo.create({
          user,
        }),
      );
      user.profile = profile;

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
      const { user } = await this.getUserById({ id: '10' });
      if (updatedUser.email) user.email = updatedUser.email;
      if (updatedUser.username) user.username = updatedUser.username;
      if (updatedUser.password) user.password = updatedUser.password;
      await this.usersRepo.save(user);
      return {
        ok: true,
        user,
      };
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

  async UpdateProfile({
    email,
    bio,
  }: UpdateProfileInput): Promise<UpdateProfileOutput> {
    try {
      const user = await this.usersRepo.findOneOrFail({
        where: { email },
        relations: ['profile'],
      });
      if (!user.profile) {
        return { ok: false, error: 'profile not exits' };
      }
      const userProfile = user.profile;
      if (bio) {
        userProfile.bio = bio;
      }
      await this.profilesRepo.save(userProfile);
      return {
        ok: true,
        profile: userProfile,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot update User Profile',
      };
    }
  }
}
