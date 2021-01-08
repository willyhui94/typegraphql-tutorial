import { ObjectType, ID, Field } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@ObjectType({ description: 'The user model' })
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field(() => String)
  @Property({ required: true })
  name: string;

  @Field(() => String)
  @Property({ required: true })
  avater: string;
}

export const UserModel = getModelForClass(User);
