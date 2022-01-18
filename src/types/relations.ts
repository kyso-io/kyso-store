import { Comment } from "./comment";
import { Report } from "./report";
import { Repository } from "./repository";
import { Team } from "./team";
import { User } from "./user";

export type Relation = {
  [key: string]: Report | Comment | Team | User | Repository
}
