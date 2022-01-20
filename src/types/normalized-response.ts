import { Relation } from "./relations";

export type NormalizedResponseDTO<T> = {
  data: T;
  relations?: Relation;
};
