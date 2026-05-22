# MyMoodle HTTP Server
In this project I built a simple HTTP server using the `net` module in Node.js.
The idea was to better understand how HTTP works and build something similar to Express from scratch.

## Features
- HTTP request parsing
- HTTP response creation
- Routing system (`get`, `post`)
- Route parameters (`/student/:id`)
- Static file serving (`style.css`)
- JSON responses
- 404 handling

## Routes
### GET Routes
- `/welcome` – welcome page
- `/profile` – student profile page
- `/courses` – student courses
- `/grades` – student grades
- `/student/:id` – dynamic student id route

### POST Route

- `/contact` – returns a confirmation message

For example:

```bash
curl -X POST http://localhost:3000/contact
```

Response:

```json
{"message":"Contact request received"}
```

## Static Files

The server supports static file serving from the `public` folder.

For example:

```txt
/style.css
```

## Creative Feature

I created a mini student portal similar to Moodle and named it **MyMoodle**. It includes multiple pages and custom styling.

The project also supports dynamic routes like:
```txt
/student/123
```
which returns the student id from the URL.

## How to Run
Run the server:

```bash
node server.js
```

Then open:

```txt
http://localhost:3000/welcome
```