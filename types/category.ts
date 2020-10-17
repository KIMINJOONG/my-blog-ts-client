export interface ICategory {
  id: number;
  code: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryRequest {
  code: number;
  name: string;
}
