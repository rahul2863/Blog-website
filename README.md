
# Blog Website

## Introduction

This is a blog website built using Node.js and Express.js. It utilizes a custom REST API to handle server requests and operations. A PostgreSQL database is used to store and manage all blog post data, including creating new posts, updating existing posts, and deleting posts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new blog posts
- Update existing blog posts
- Delete blog posts
- View all blog posts
- View individual blog posts

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-website.git
   cd blog-website

2. Install dependencies:
    ```
    npm install

3. Set up the PostgreSQL database:

- Create a new database

    ```
    CREATE DATABASE Blogs;

- Create a table

    ```
    CREATE TABLE blog_posts(
    id SERIAL PRIMARY KEY,
    title varchar(200),
    content text,
    author varchar(100),
    date varchar(50)
    ); 

4. Update the database configuration in the .env file:

    ```
    DB_HOST=localhost
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_NAME=blogdb

5. Start the server(server.js) to start the backend server :
    ```
    nodemon server.js
This server will be running on http://localhost:3000.

6. Open another terminal and start the server (index.js) to handle API requests

    ```
    nodemon index.js
This server will be running on http://localhost:4000.

## Usage

### Viewing the Blog

Open your browser and navigate to http://localhost:3000 to view the blog website. You can view all posts.

### Managing Blog Posts
Use the provided API endpoints to create, update, and delete blog posts. You can use tools like Postman or cURL to interact with the API.

### API Endpoints
#### Base URL
http://localhost:4000/

#### Endpoints
- ##### GET /posts
  - Description: Retrieve all blog posts
  - Response: Array of blog post objects

- ##### GET /posts/

  - Description: Retrieve a single blog post by ID
  - Parameters: `id` (required) - ID of the post to retrieve
  - Response: Blog post object


- ##### POST /posts

  - Description: Create a new blog post
  - Body: JSON object containing `title`,`content`,`author`
  - Response: Created blog post object


- ##### PATCH /posts/

  - Description: Update an existing blog post
  - Parameters: `id` (required) - ID of the post to update
  - Body: JSON object containing `title` and/or `content`
  - Response: Updated blog post object

- ##### DELETE /posts/

  - Description: Delete a blog post
  - Parameters: id (required) - ID of the post to delete
  - Response: Success message


## Database Schema
### Blog Posts Table


| Column |  Type  | Description |
|:-----|:--------|:------|
|id|SERIAL|Primary key|
|title|VARCHAR(200)|Title of the blog post|
|content|TEXT|Content of the blog post|
|author|varchar(100)|Author of blog post|
|date|varchar(50)|Time for blog creation or modification.|





## Contributing

We welcome contributions to improve the blog website. Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.


## License
This project is licensed under the MIT License. See the [MIT](https://choosealicense.com/licenses/mit/) License file for details.


