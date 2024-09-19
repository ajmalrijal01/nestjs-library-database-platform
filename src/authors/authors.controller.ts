import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './authors.model';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async getAuthors(
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ): Promise<Author[]> {
    const sort = {
      sortBy,
      sortOrder,
    };

    return this.authorsService.findAll(search, sort);
  }
}
