import {
  Resolver,
  FieldResolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Root,
} from 'type-graphql';
import { Book, BookModel } from '../entities/Book';
import { AddBookInput } from '../types/inputs/AddBookInput';
import { User, UserModel } from '../entities/User';
import { Comment, CommentModel } from '../entities/Comment';
import { ORDER_BY } from '../enums/ORDER_BY';
import { SORT_BY } from '../enums/SORT_BY';

@Resolver((of) => Book)
export class BookResolver {
  @Query((returns) => [Book])
  async getBooks(
    @Arg('limit', { nullable: true }) limit: number = 2,
    @Arg('page', { nullable: true }) page: number = 1,
    @Arg('orderBy', (type) => ORDER_BY, { nullable: true })
    orderBy: ORDER_BY = ORDER_BY.asc,
    @Arg('sortBy', (type) => SORT_BY, { nullable: true })
    sortBy: SORT_BY = SORT_BY.name,
    @Arg('authorName', { nullable: true })
    authorName: string = '',
    @Arg('bookName', { nullable: true }) bookName: string = ''
  ): Promise<Book[]> {
    const numberOfSkip = (page - 1) * limit;
    const books = await BookModel.aggregate([
      {
        $lookup: {
          from: UserModel.collection.name,
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $match: {
          $and: [
            { 'author.name': { $regex: authorName } },
            { name: { $regex: bookName } },
          ],
        },
      },
    ])
      .skip(numberOfSkip)
      .limit(limit)
      .sort({ [sortBy]: orderBy });
    return books;
  }

  @Query((returns) => Book, { nullable: true })
  async book(@Arg('bookId') bookId: string): Promise<Book | null> {
    const book = await BookModel.findById(bookId);
    return book;
  }

  @Query((returns) => Book, { nullable: true })
  async bookDetails(@Arg('bookId') bookId: string): Promise<Book | null> {
    const book = await BookModel.findById(bookId);
    return book;
  }

  @Mutation((returns) => Book)
  async addBook(
    @Arg('data') newBookData: AddBookInput,
    @Ctx() ctx: Book
  ): Promise<Book> {
    const book = new BookModel({
      name: newBookData.name,
      author: newBookData.author,
      publishData: new Date(),
    } as Book);
    await book.save();
    return book;
  }

  @FieldResolver()
  async author(@Root() book: Book): Promise<User> {
    const user = await UserModel.findById(book.author);
    return user!;
  }

  @FieldResolver()
  async comments(@Root() book: Book): Promise<Comment[]> {
    const comments = await CommentModel.find({ _id: { $in: book.comments } });
    return comments!;
  }
}
