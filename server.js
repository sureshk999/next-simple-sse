const express = require('express');
const app = express();
const port = 3005;

//need to npm install cors
const cors = require('cors'); // Import the cors package

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Regular route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World! Navigate to /events for SSE.');
});

// Use the cors middleware to enable CORS for your SSE endpoint
app.use(cors());

// SSE route
app.get('/events', function(req, res) {
  // Set necessary headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send a message every second
  const intervalId = setInterval(function() {
    const message = `data: This SSE test is working just fine! The server time is ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 1000);

  // Clean up when connection is closed
  req.on('close', function() {
    clearInterval(intervalId);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

