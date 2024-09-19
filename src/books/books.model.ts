import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IsNotEmpty, IsDate, IsString } from 'class-validator';
import { Author } from '../authors/authors.model'; // Import the Author model

@Table
export class Book extends Model<Book> {
  @IsNotEmpty()
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @IsNotEmpty()
  @IsDate()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  publicationDate: Date;

  @IsNotEmpty()
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;
}
