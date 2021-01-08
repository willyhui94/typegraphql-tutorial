import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import { TypegooseMiddleware } from './middlewares/typegoose-middleware';
import { Context } from './interface/context.interface';
import { authChecker } from './utils/auth-checker';

import { BookResolver } from './resolvers/BookResolver';
import { UserResolver } from './resolvers/UserResolver';
import { CommentResolver } from './resolvers/CommentResolver';

const MONGO_DB_URL =
  'mongodb+srv://dbUser:dbUserPassword@graphql-tutorial-databa.fcqya.mongodb.net/<dbname>?retryWrites=true&w=majority';

const main = async () => {
  try {
    const mongoose = await connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
      console.log(`MongoDB connected`);
    });

    const schema = await buildSchema({
      resolvers: [BookResolver, UserResolver, CommentResolver],
      globalMiddlewares: [TypegooseMiddleware],
      // authChecker: authChecker,
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const apolloServer = new ApolloServer({
      schema: schema,
    });

    const { url } = await apolloServer.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

main();
