import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Book } from 'src/books/books.model';

@Table
export class Author extends Model<Author> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bio: string;

  @HasMany(() => Book)
  books: Book[];
}
