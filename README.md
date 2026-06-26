# Product Browser Backend

It allows users to browse around 200,000 products, filter them by category, and paginate through the results using cursor-based pagination.

## Features

* Browse products sorted by newest first
* Filter products by category
* Cursor-based pagination
* Snapshot-based pagination using `anchorTime`
* Seed script to generate approximately 200,000 products


## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a PostgreSQL database

Create a PostgreSQL database (I used Neon) and copy the connection string.

Create a `.env` file in the project root and add:

```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

### 4. Create the products table


### 5. Seed the database

Run the following command to generate and insert approximately 200,000 products:

```bash
npm run seed
```

### 6. Start the server

```bash
npm run dev
```

or

```bash
npm start
```

The server will start on:

```
http://localhost:3000
```

## API

### Get Products

```
GET /products
```

Optional query parameters:

* `limit` – Number of products to return (default: 20, maximum: 100)
* `category` – Filter products by category
* `cursorTime` – Cursor timestamp for pagination
* `cursorId` – Cursor product ID
* `anchorTime` – Snapshot timestamp for consistent pagination

### Example Requests

```
GET /products
```

```
GET /products?limit=10
```

```
GET /products?category=Books
```

```
GET /products?limit=10&category=Books
```

```
GET /products?limit=20&cursorTime=<cursorTime>&cursorId=<cursorId>&anchorTime=<anchorTime>
```

## Notes

* Products are always returned in descending order of `updated_at`.
* Cursor-based pagination is used instead of OFFSET for better performance on large datasets.
* `anchorTime` is used to keep pagination consistent while data is being updated.

