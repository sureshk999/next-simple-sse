export default function handler(req, res) {
    // Manually write headers to the response object
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
    });

    let count = 0;
    const interval = setInterval(() => {
        const message = `data: Message ${count}\n\n`;
        res.write(message);
        count += 1;
    }, 1000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
}
