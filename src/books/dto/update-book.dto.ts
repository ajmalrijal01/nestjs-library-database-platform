import { IsOptional, IsString, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publicationDate?: Date;

  @IsOptional()
  @IsInt()
  authorId?: number;
}
