import { AuthUser } from '@/auth/auth-user.decorator';
import { AuthGuard } from '@/auth/auth.guard';
import { Role } from '@/auth/role.decorator';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // user - query
  @Query((returns) => SearchUserByEmailOutput)
  async searchUsersByEmail(
    @Args('input') searchUserInput: SearchUserByEmailInput,
  ) {
    return this.usersService.searchUsersByEmail(searchUserInput);
  }

  @Query((returns) => GetUserByIdOutput)
  async getUserById(@Args('input') getUserByIdInput: GetUserByIdInput) {
    return this.usersService.getUserById(getUserByIdInput);
  }

  @Query((returns) => GetUserByEmailOutput)
  async getUserByEmail(
    @Args('input') getUserByEmailInput: GetUserByEmailInput,
  ) {
    return this.usersService.getUserByEmail(getUserByEmailInput);
  }

  // @UseGuards(AuthGuard)
  // @SetMetadata('lala', 'dosimpact')
  @Role(['Any'])
  @Query((returns) => User)
  async me(@AuthUser() user: User) {
    return user;
  }

  // user - Mutation
  @Mutation((returns) => CreateUserOutput)
  async createUser(@Args('input') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
  @Mutation((returns) => LoginUserOuput)
  async loginUser(@Args('input') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }

  // update user field
  @Mutation((returns) => UpdateUserOutput)
  async updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput);
  }
  // update user profile field
  @Mutation((returns) => UpdateProfileOutput)
  async updateProfile(@Args('input') updateProfileInput: UpdateProfileInput) {
    return this.usersService.UpdateProfile(updateProfileInput);
  }

  // soft delete user
  @Mutation((returns) => DeleteUserOutput)
  async deleteUser(@Args('input') deleteUserInput: DeleteUserInput) {
    return this.usersService.deleteUser(deleteUserInput);
  }
  // TODO hard delete user
}
