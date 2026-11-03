 // Import required modules
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server port
const PORT = 3000;

// Array containing books
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 250
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        price: 450
    }
];

// Function to send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data, null, 2));
}

// Function to read request body
function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", reject);
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {

    const url = new URL(
        req.url,
        `http://${req.headers.host || "localhost"}`
    );

    const pathname = url.pathname;

    // Route 1: Welcome page
    if (req.method === "GET" && pathname === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Welcome to Library Book Management</h1>
            <p>Our Node.js HTTP Server is running successfully.</p>
        `);
    }

    // Route 2: Display all books
    else if (req.method === "GET" && pathname === "/books") {

        sendJSON(res, 200, books);
    }

    // Route 3: Add a new book
    else if (req.method === "POST" && pathname === "/add-book") {

        try {
            const book = await readBody(req);

            const { id, title, author, price } = book;

            if (
                !Number.isInteger(Number(id)) ||
                id === undefined ||
                !title ||
                !author ||
                price === undefined ||
                !Number.isFinite(Number(price)) ||
                Number(price) < 0
            ) {
                sendJSON(res, 400, {
                    message: "Please provide valid id, title, author and price."
                });
                return;
            }

            if (books.some(b => b.id === Number(id))) {
                sendJSON(res, 409, {
                    message: "Book ID already exists."
                });
                return;
            }

            const newBook = {
                id: Number(id),
                title: title,
                author: author,
                price: Number(price)
            };

            books.push(newBook);

            sendJSON(res, 201, {
                message: "Book added successfully",
                book: newBook
            });

        } catch (error) {
            sendJSON(res, 400, {
                message: "Invalid JSON request."
            });
        }
    }

    // Route 4: About page
    else if (req.method === "GET" && pathname === "/about") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end(
            "Library Book Management Application using Node.js."
        );
    }

    // Route 5: Serve HTML file using FS module
    else if (req.method === "GET" && pathname === "/home") {

        const filePath = path.join(
            __dirname,
            "public",
            "index.html"
        );

        fs.readFile(filePath, "utf8", (error, data) => {

            if (error) {
                sendJSON(res, 500, {
                    message: "Unable to read HTML file."
                });
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // Invalid route
    else {

        sendJSON(res, 404, {
            message: "404 Page Not Found"
        });
    }

});

// Start HTTP server
server.listen(PORT, () => {

    console.log(
        `HTTP Server running at http://localhost:${PORT}`
    );

});