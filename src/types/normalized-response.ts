import { Relation } from "./relations";

export type NormalizedResponse<T> = {
  data: T;
  relations?: Relation;
};
