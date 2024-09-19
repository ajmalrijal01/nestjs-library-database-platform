import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.model';
import { GetBooksDto } from './dto/get-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async getBooks(
    @Query() query: GetBooksDto,
  ): Promise<{ books: Book[]; totalPages: number }> {
    // DTO will automatically validate and transform the query parameters
    const {
      search,
      genre,
      publicationDate,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
      startDate,
      endDate,
    } = query;

    // Create filter and sort objects based on the validated query
    const filter = {
      genre,
      publicationDate: publicationDate ? new Date(publicationDate) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };

    const sort = {
      sortBy,
      sortOrder,
    };

    return this.booksService.findAll(
      search,
      filter,
      sort,
      limit,
      (page - 1) * limit,
    );
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOneById(id);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<void> {
    return this.booksService.delete(id);
  }
}
