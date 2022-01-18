import { Comment, Report, Repository, Team, User } from "@kyso-io/kyso-model";

export type Relation = {
  [key: string]: Report | Comment | Team | User | Repository
}
