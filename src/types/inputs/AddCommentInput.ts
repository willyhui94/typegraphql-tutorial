import { InputType, Field } from 'type-graphql';
import { Comment } from '../../entities/Comment';
import { ObjectId } from 'mongodb';

@InputType()
export class AddCommentInput implements Partial<Comment> {
  @Field((type) => String)
  book: ObjectId;

  @Field((type) => String)
  content: string;

  @Field((type) => String)
  commenter: ObjectId;
}
