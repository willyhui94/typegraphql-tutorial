import { Request } from 'express';
import { User } from './user.interface';

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        name: string;
        roles: string[];
      };
    }
  }
}

export interface Context {
  user: User;
  req: Request;
}
