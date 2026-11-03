# Library Book Management Web Application

## Setup
```bash
npm install
```

## Part A: Node.js HTTP server
```bash
node httpserver.js
```
Open `http://localhost:3000/`, `/books`, `/about`, and `/home`.

POST `http://localhost:3000/add-book` with JSON:
```json
{
  "id": 4,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 550
}
```

## Part B: Express REST API
Open a second terminal and run:
```bash
node expressApp.js
```
The API runs at `http://localhost:4000`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

Use JSON request bodies for POST and PUT. Data is stored in JavaScript arrays and resets when the server restarts.
# Library Book Management System

## API Testing Screenshots

### 1. GET All Books
![GET All Books](screenshots/get-all-books.png)

### 2. GET Book By ID
![GET Book By ID](screenshots/get-book-by-id.png)

### 3. POST - Add New Book
![Add Book](screenshots/post-book.png)

### 4. PUT - Update Book
![Update Book](screenshots/put-book.png)

### 5. DELETE - Delete Book
![Delete Book](screenshots/delete-book.png)