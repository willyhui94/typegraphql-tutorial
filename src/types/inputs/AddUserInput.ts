import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class AddUserInput implements Partial<User> {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  avater: string;
}
