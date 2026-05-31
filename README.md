# MyMoodle HTTP Server
In this project I built a simple HTTP server using the `net` module in Node.js.
The idea was to better understand how HTTP works and build something similar to Express from scratch.

## Features
- HTTP request parsing
- HTTP response creation
- Routing system (`get`, `post`)
- Route parameters (`/assignment/:id`)
- Static file serving (`style.css`)
- JSON responses
- 404 handling
- Method chaining and Route grouping

## Routes
### GET Routes
- `/welcome` – welcome page
- `/profile` – student profile page
- `/courses` – student courses
- `/grades` – student grades
- `/assignment/:id` – dynamic assignment details route

### POST and GET Route
- `/contact` – The GET route returns an HTML contact form, and the POST route returns a beautifully styled HTML confirmation message.

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
/assignment/1
```
which extracts the assignment ID from the URL to display specific task details dynamically.

I added two things to the router:

1. **Method Chaining:** Instead of writing `router.get` on a new line every time, the methods return `this`, so you can just chain them together.

2. **Route Grouping:** I added a `route(path)` function. This lets you write the path just once and attach different methods to it (like GET and POST). 

For example: `router.route('/contact').get(...).post(...)`.

## How to Run
Run the server:

```bash
node server.js
```

Then open:

```txt
http://localhost:3000/welcome
```