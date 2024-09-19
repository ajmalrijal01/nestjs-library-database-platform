import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../authors/authors.model';
import { Op } from 'sequelize';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private readonly bookModel: typeof Book,
    @InjectModel(Author) private readonly authorModel: typeof Author,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await Author.findByPk(createBookDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const book = new Book({
      ...createBookDto,
    });
    return book.save();
  }

  async findAll(
    search?: string,
    filter?: {
      genre?: string;
      publicationDate?: Date;
      startDate?: Date;
      endDate?: Date;
    }, // Add startDate and endDate here
    sort?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ books: Book[]; totalPages: number }> {
    const queryOptions: any = {
      limit,
      offset,
      include: [Author], // Include associated author
    };

    // Search by title (case-insensitive)
    if (search) {
      queryOptions.where = {
        title: {
          [Op.iLike]: `%${search}%`, // Case-insensitive search
        },
      };
    }

    // Add filters for genre, publicationDate, startDate, and endDate
    if (filter) {
      queryOptions.where = {
        ...queryOptions.where, // Merge with existing where clause

        // Genre filter
        ...(filter.genre && { genre: filter.genre }),

        // Exact publicationDate filter
        ...(filter.publicationDate && {
          publicationDate: filter.publicationDate,
        }),

        // Date range filtering (startDate and endDate)
        ...(filter.startDate &&
          filter.endDate && {
            publicationDate: {
              [Op.between]: [filter.startDate, filter.endDate], // Between startDate and endDate
            },
          }),

        // Only startDate filtering
        ...(filter.startDate &&
          !filter.endDate && {
            publicationDate: {
              [Op.gte]: filter.startDate, // Greater than or equal to startDate
            },
          }),

        // Only endDate filtering
        ...(filter.endDate &&
          !filter.startDate && {
            publicationDate: {
              [Op.lte]: filter.endDate, // Less than or equal to endDate
            },
          }),
      };
    }

    // Sorting logic (default to title in ASC order)
    if (sort) {
      queryOptions.order = [[sort.sortBy || 'title', sort.sortOrder || 'ASC']];
    }

    // (rest of your logic remains unchanged)
    // Return the result of findAll with pagination
    const { count, rows } = await this.bookModel.findAndCountAll(queryOptions);
    const totalPages = Math.ceil(count / limit); // Total pages calculation

    return { books: rows, totalPages };

    // // Return the result of findAll with the queryOptions
    // return this.bookModel.findAll(queryOptions);
  }

  async findOneById(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id, {
      include: [Author], // Include associated author
    });

    if (!book) {
      throw new NotFoundException('Book with ID ${id} not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // If authorId is provided, validate if the author exists
    if (updateBookDto.authorId) {
      const author = await this.authorModel.findByPk(updateBookDto.authorId);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
    }

    // Update the book with the new values
    await book.update({
      ...updateBookDto,
    });

    return book;
  }

  async delete(id: number): Promise<void> {
    const book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await book.destroy();
  }

  // Add other CRUD methods later
}
