import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './books.model';
import { Author } from 'src/authors/authors.model'; // If you need to inject Author too

@Module({
  imports: [SequelizeModule.forFeature([Book, Author])], // Register models here
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
