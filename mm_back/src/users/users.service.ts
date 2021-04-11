import { JwtService } from '@/jwt/jwt.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  SearchUserInput,
} from './dtos/query-user.dtos';
import { Bio, Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';

// const logger = new Logger('UsersService');

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
  ) {
    const main = async () => {
      // create - user > profile & verification
      const username = 'user16';
      // console.log('users Service init');
      let user = this.usersRepo.create();
      user.email = `${username}@test.com`;
      user.password = username;
      user.username = username;
      // console.log('before saved', user); // 이메일과 패스워드 뿐이었는데,
      user = await this.usersRepo.save(user);
      // console.log('after saved', user); // Core데이터들이 채워지고 나옴.

      let profile = await this.profilesRepo.save(
        this.profilesRepo.create({ user, bio: Bio.NoComment }),
      );
      // 직접 userid를 설정하려고하면 단순히 숫자만 들어가게 된다.
      //  this.profilesRepo.create({ userId: user.id }),
      // console.log(profile);
      let verification = await this.verificationsRepo.save(
        this.verificationsRepo.create({ user }),
      );
      // console.log(verification);

      // read - user , profile, verification
      // only user
      const res1 = await this.usersRepo.findOne({ where: { username } });
      // console.log(res1);
      // user + profile relations
      const res2 = await this.usersRepo.find({
        where: { username },
        relations: ['profile'],
      });
      // console.log(res2);
      // profile { where user }
      const res3 = await this.profilesRepo.findOne({ where: { user: res1 } });
      // console.log(res3);
      // verification { where user }
      const res4 = await this.verificationsRepo.findOne({
        where: { user: res2[0] },
      });
      // console.log(res4);

      // ## update
      // update - user field
      user.email = `${username}@updated.com`;
      const res5 = await this.usersRepo.save(user);
      // console.log(res5);

      // update user profile field
      profile = await this.profilesRepo.findOne({ where: { user } });
      profile.bio = Bio.Woman;
      profile = await this.profilesRepo.save(profile);
      // console.log(profile);

      // update user profile object
      // 1. delete profile
      await this.profilesRepo.remove(profile); // remove + object(class)
      // await this.profilesRepo.delete(profile.id)  // delete + id
      user = await this.usersRepo.findOne({
        where: { username },
        relations: ['profile'],
      });
      // profile : null 출력
      // console.log('after remove profile user', user);
      // 2. new give profile to user
      profile = await this.profilesRepo.save(
        this.profilesRepo.create({ bio: Bio.Man }),
      );
      user = await this.usersRepo.findOne({
        where: { username },
        relations: ['profile'],
      });
      // profile : null 출력 ( 아직은 null 임 )
      // console.log('1 user', user);
      user.profile = profile;
      user = await this.usersRepo.save(user);
      // 확인 - 1:1 relation중 한곳에서 연결시키면, 다른 한쪽도 업데이트가 된ㄷ.
      user = await this.usersRepo.findOne({
        where: { username },
        relations: ['profile'],
      });
      profile = await this.profilesRepo.findOne({
        where: { user },
        relations: ['user'],
      });
      // console.log('updated user', user); // profile 잘 나옴
      // console.log('updated profile', profile); // user 잘 나옴

      // ---- delete/remove & softDelete/softRemove
      // profile 삭제되면 - 자동으로 user에 연결된 profile은 null 반환 (위에서 확인)

      // delete cacade
      await this.usersRepo.delete(user.id);
      profile = await this.profilesRepo.findOne({
        where: { user },
        relations: ['user'],
      });
      verification = await this.verificationsRepo.findOne({
        where: { user },
        relations: ['user'],
      });
      console.log('result after cascade');
      console.log(profile);
      console.log(verification);
    };
    main();
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

  async findPasswordUser() {}

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
      const user = this.usersRepo.create(createUserInput);
      const profile = await this.profilesRepo.save(this.profilesRepo.create());
      user.profile = profile;
      await this.usersRepo.save(user);

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
    bio,
    email,
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
