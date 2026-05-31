const net = require("net");
const { parseRequest } = require("./src/parser");
const { createRouter } = require("./src/router");
const { createResponse } = require("./src/createResponse");
const { serveStatic } = require("./src/static");

const router = createRouter();
const staticHandler = serveStatic('./public');

// Define routes
router
  .get('/welcome', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Welcome to MyMoodle</h1>
      <p>Select a page:</p>
      <ul>
        <li><a href="/profile">Student Profile</a></li>
        <li><a href="/courses">My Courses</a></li>
        <li><a href="/grades">My Grades</a></li>
        <li><a href="/student/123">Student Details</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    `);
  })
  .get('/profile', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Student Profile</h1>
      <p>Name: Rotem Sela</p>
      <p>Program: LL.B. in Law</p>
      <p>Year: B</p>
    `);
  })
  .get('/courses', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>My Courses</h1>
      <ul>
        <li>Constitutional Law</li>
        <li>Criminal Law</li>
        <li>Contract Law</li>
      </ul>
    `);
  })
  .get('/grades', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>My Grades</h1>
      <ul>
        <li>Constitutional Law: 94</li>
        <li>Criminal Law: 91</li>
        <li>Contract Law: 96</li>
      </ul>
    `);
  })
  .get('/student/:id', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Student Details</h1>
      <p>Student ID: ${req.params.id}</p>
    `);
  });

router.route('/contact')
  .get((req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Contact Us</h1>
      <form method="POST" action="/contact">
        <button type="submit">Send Test Request</button>
      </form>
    `);
  })
  .post((req, res) => {
    res.status(201).json({
      message: 'Contact request received'
    });
  });

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const req = parseRequest(data);
    const res = createResponse(socket);

    const matched = router.match(req.method, req.path);

    if (matched) {
      req.params = matched.params;
      matched.handler(req, res);
    } else {
      staticHandler(req, socket);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});