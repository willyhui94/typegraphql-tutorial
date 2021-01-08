import { InputType, Field } from 'type-graphql';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';

@InputType()
export class AddBookInput implements Partial<Book> {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  author: User;
}
