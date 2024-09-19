<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project is a RESTful API for managing a library system, built using NestJS, PostgreSQL, and Sequelize. The API supports operations for managing books and authors, including creating, reading, updating, and deleting records. It also provides features for searching, filtering, and sorting books.

## Features

- **Books Management**: Create, Read, Update, and Delete books with associated authors.
- **Author Management**: Create, Read, Update, and Delete authors.
- **Search and Filters**: Search for books by title, filter by genre, publication date, and date ranges.
- **Sorting**: Sort books by title, genre, or publication date.
- **Pagination**: List books with pagination support.
- **Validation**: Ensure data integrity with validation on input fields.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Sequelize**: A promise-based Node.js ORM for PostgreSQL, used for database interactions.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

### Install Dependencies

```bash
$ npm install
```

### Running the App

```bash
# development mode
$ npm run start

# watch mode
$ npm run start:dev
```

## Set up environment variables

Create a .env file in the root directory and add your database configuration.

- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=your-username
- DB_PASSWORD=your-password
- DB_NAME=your-database-name

Replace `your-username`, `your-password`, and `your-database-name` with your actual PostgreSQL credentials.

## API Endpoints

### Books

- **Create a Book**
- POST http://localhost:3000/books
- Request body: CreateBookDto

- **Get a Specific Book**
- GET http://localhost:3000/books/:id
- Response: Book details along with associated author

- **List All Book**
- GET http://localhost:3000/books
- Query parameters: search, genre, publicationDate, sortBy, sortOrder, page, limit, startDate, endDate

- **Update a Book**
- PATCH http://localhost:3000/books/:id
- Request body: Partial UpdateBookDto

- **Delete a Book**
- DELETE http://localhost:3000/books/:id

### Author

- **Create an Author**
- POST http://localhost:3000/authors
- Request body: CreateAuthorDto

- **Get a Specific Author**
- GET http://localhost:3000/authors/:id

- **List All Authors**
- GET http://localhost:3000/authors
- Query parameters: search, page, limit

- **Update an Author**
- PATCH http://localhost:3000/authors/:id
- Request body: Partial UpdateAuthorDto

- **Delete an Author**
- DELETE http://localhost:3000/authors/:id

## License

Nest is [MIT licensed](LICENSE).

## Contact

For any questions or issues, please contact ajmalrijal01@gmail.com.
