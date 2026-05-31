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
        <li><a href="/assignment/1">Assignments </a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    `);
  })
  .get('/profile', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <div class="profile-header">
        <img src="https://www.israelhayom.co.il/wp-content/uploads/2026/02/10/10/WhatsApp-Image-2026-02-10-at-21.27.19-600x400.jpeg" alt="Student Photo" class="profile-img">
        <h1>Student Profile</h1>
      </div>
      <ul>
        <li><strong>Name:</strong> Rotem Sela</li>
        <li><strong>Program:</strong> LL.B. in Law</li>
        <li><strong>Year:</strong> B</li>
      </ul>
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
  .get('/assignment/:id', (req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Assignment Details</h1>
      <ul>
        <li><strong>Task Name:</strong> Assignment ${req.params.id}</li>
        <li><strong>Status:</strong> In Progress</li>
      </ul>
    `);
  });

router.route('/contact')
  .get((req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Contact Us</h1>
      <form method="POST" action="/contact">
        <p>How can we help you today?</p>
        <textarea name="message" rows="5" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #475569; background-color: #f8f9fa; margin-bottom: 15px; font-family: inherit; font-size: 16px; resize: vertical;" placeholder="Write your message here..." required></textarea>
        <button type="submit">Send Message</button>
      </form>
    `);
  })
  .post((req, res) => {
    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Message Sent Successfully! </h1>
      <p>Thank you for contacting us. We have received your message and will get back to you within 24 hours.</p>
      <br>
      <a href="/welcome" style="display: inline-block; text-align: center; max-width: 200px;">Return to Home</a>
    `);
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