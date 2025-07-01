export interface Member {
  id: string;
  name: string;
  categories: { [key: string]: number }; // key: category name, value: quantity
}
