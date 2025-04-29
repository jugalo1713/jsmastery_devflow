interface Question {
  _id: string | number;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}
interface Tag {
  _id: string | number;
  name: string;
}
interface Author {
  _id: string | number;
  name: string;
  image: string;
}
