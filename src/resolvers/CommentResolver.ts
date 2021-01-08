import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Authorized,
  Ctx,
} from 'type-graphql';
import { Comment, CommentModel } from '../entities/Comment';
import { User, UserModel } from '../entities/User';
import { AddCommentInput } from '../types/inputs/AddCommentInput';
import { BookModel } from '../entities/Book';

@Resolver((of) => Comment)
export class CommentResolver {
  @Query((returns) => [Comment])
  async getComments(): Promise<Comment[]> {
    const comments = await CommentModel.find({});
    return comments;
  }

  @Mutation((returns) => Comment)
  async addComment(
    @Arg('data') newCommentData: AddCommentInput
  ): Promise<Comment> {
    const comment = new CommentModel({
      content: newCommentData.content,
      commenter: newCommentData.commenter,
    });
    await comment.save();

    const book = await BookModel.findById(newCommentData.book);
    book?.comments.push(comment);
    book?.save();

    return comment;
  }

  @FieldResolver()
  async commenter(@Root() comment: Comment): Promise<User> {
    const user = await UserModel.findById(comment.commenter);
    return user!;
  }
}
