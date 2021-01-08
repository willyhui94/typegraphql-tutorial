import { registerEnumType } from 'type-graphql';

export enum ORDER_BY {
  asc,
  desc,
}

registerEnumType(ORDER_BY, {
  name: 'ORDER_BY',
});
