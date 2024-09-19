import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private readonly authorModel: typeof Author,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author({
      ...createAuthorDto,
    });
    return author.save();
  }

  async findOneById(id: number): Promise<Author> {
    return this.authorModel.findByPk(id);
  }

  async findAll(
    search?: string,
    sort?: { sortBy?: string; sortOrder?: 'ASC' | 'DESC' },
    limit?: number,
    offset?: number,
  ): Promise<Author[]> {
    const queryOptions: any = { limit, offset };

    if (search) {
      queryOptions.where = {
        name: {
          [Op.iLike]: `%${search}%`, // Case-insensitive search
        },
      };
    }

    if (sort) {
      queryOptions.order = [[sort.sortBy || 'name', sort.sortOrder || 'ASC']];
    }

    return this.authorModel.findAll(queryOptions);
  }
}
