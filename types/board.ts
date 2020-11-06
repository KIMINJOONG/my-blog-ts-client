import { ICategory } from "./category";
import { IComment } from "./comment";

export interface IBoard {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  view: number;
  categoryId: number;
  comments: Array<IComment>;
  shortContent: string;
  category: ICategory;
}

export interface ILikes {
  boardId: number;
  userId: number;
}