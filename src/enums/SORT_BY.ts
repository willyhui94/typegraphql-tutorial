import { registerEnumType } from 'type-graphql';

export enum SORT_BY {
  name,
  publishDate,
}

registerEnumType(SORT_BY, {
  name: 'SORT_BY',
});
