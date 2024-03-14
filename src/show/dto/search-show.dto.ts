import { Category } from "../types/showCategory.type";

export class SearchShowDto {
  title?: string;
  startDate?: Date;
  endDate?: Date;
  category?: Category;
}
