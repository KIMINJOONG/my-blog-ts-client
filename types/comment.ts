import { IUser } from "./user";

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  user: IUser;
  userId: number;
}
