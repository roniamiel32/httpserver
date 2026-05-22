const net = require("net");
const { parseRequest } = require("./src/parser");
const { createRouter } = require("./src/router");
const { createResponse } = require("./src/createResponse");

const router = createRouter();

// Define routes
router.get('/welcome', (req, res) => {
  res.send('<h1>Welcome to MyMoodle</h1>');
});

router.get('/profile', (req, res) => {
  res.send(`
    <h1>Student Profile</h1>
    <p>Name: Rotem Sela</p>
    <p>Program: LL.B. in Law</p>
    <p>Year: B</p>
  `);
});

router.get('/courses', (req, res) => {
  res.send(`
    <h1>My Courses</h1>
    <ul>
      <li>Constitutional Law</li>
      <li>Criminal Law</li>
      <li>Contract Law</li>
    </ul>
  `);
});

router.get('/grades', (req, res) => {
  res.send(`
    <h1>My Grades</h1>
    <ul>
      <li>Constitutional Law: 94</li>
      <li>Criminal Law: 91</li>
      <li>Contract Law: 96</li>
    </ul>
  `);
});

router.get('/student/:id', (req, res) => {
  res.send(`
    <h1>Student Details</h1>
    <p>Student ID: ${req.params.id}</p>
  `);
});

router.post('/contact', (req, res) => {
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
      res.status(404).json({
        error: 'Not Found'
      });
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
