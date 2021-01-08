import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { User } from './User';

@ObjectType({ description: 'The comment model' })
export class Comment {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  content: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  commenter: Ref<User>;
}

export const CommentModel = getModelForClass(Comment);
