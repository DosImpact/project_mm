import { ConfigService } from '@nestjs/config';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserInput,
  CreateUserOutput,
  DeleteUserInput,
  DeleteUserOutput,
  UpdateUserInput,
  UpdateUserOutput,
} from './dtos/mutation-user.dtos';
import {
  GetUserByEmailInput,
  GetUserByEmailOutput,
  GetUserByIdInput,
  GetUserByIdOutput,
  SearchUserInput,
  SearchUserOutput,
} from './dtos/query-user.dtos';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // user - query
  @Query((returns) => SearchUserOutput)
  async searchUser(searchUserInput: SearchUserInput) {
    return this.usersService.searchUsers(searchUserInput);
  }

  @Query((returns) => GetUserByIdOutput)
  async getUserById(getUserByIdInput: GetUserByIdInput) {
    return this.usersService.getUserById(getUserByIdInput);
  }

  @Query((returns) => GetUserByEmailOutput)
  async getUserByEmail(getUserByEmailInput: GetUserByEmailInput) {
    return this.usersService.getUserByEmail(getUserByEmailInput);
  }

  // user - Mutation
  @Mutation((returns) => CreateUserOutput)
  async createUser(createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation((returns) => UpdateUserOutput)
  async updateUser(updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput);
  }

  @Mutation((returns) => DeleteUserOutput)
  async deleteUser(deleteUserInput: DeleteUserInput) {
    return this.usersService.deleteUser(deleteUserInput);
  }
}
