import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { User } from './User';
import { Comment } from './Comment';

@ObjectType({ description: 'The book model' })
export class Book {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  @IsString()
  name: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;

  @Field(() => String)
  @Property({ required: true })
  publishData: Date;

  @Field(() => [Comment], { nullable: true })
  @Property({ ref: Comment })
  comments: Comment[];
}

export const BookModel = getModelForClass(Book);
