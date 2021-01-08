import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
} from 'type-graphql';
import { User, UserModel } from '../entities/User';
import { AddUserInput } from '../types/inputs/AddUserInput';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    const users = UserModel.find({});
    return users;
  }

  @Mutation((returns) => User)
  async addUser(@Arg('data') newUserData: AddUserInput): Promise<User> {
    const user = new UserModel({
      name: newUserData.name,
      avater: newUserData.avater,
    });
    await user.save();
    return user;
  }
}
