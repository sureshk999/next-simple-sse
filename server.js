const express = require('express');
const next = require('next');
const cors = require('cors'); // Import the cors package

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Use the cors middleware to enable CORS for your SSE endpoint
  server.use(cors());

  // Serve static files from the 'public' directory
  server.use(express.static('public'));

  // Regular route for the homepage
  server.get('/', (req, res) => {
    return app.render(req, res, '/');
  });

  // SSE route
  server.get('/events', function(req, res) {
    // Set necessary headers for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Send a message every second
    const intervalId = setInterval(function() {
      const message = `data: This SSE test is working just fine! The server time is ${new Date().toLocaleTimeString()}\n\n and the server is running on port ${port}`;
      res.write(message);
    }, 1000);

    // Clean up when connection is closed
    req.on('close', function() {
      clearInterval(intervalId);
    });
  });

  // Handle all other routes using Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the Express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running at https://next-simple-sse.vercel.app:${port}`);
  });
});

