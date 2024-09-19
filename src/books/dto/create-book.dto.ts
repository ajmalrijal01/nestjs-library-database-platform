import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsDateString()
  readonly publicationDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly genre: string;

  @IsNotEmpty()
  readonly authorId: number;
}
