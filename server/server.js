const express = require('express');
const path = require('path');
const http = require('http');

const api = require('./routes/api');
const app = express();

app.use('/api', api);

app.use(express.static('../client/dist/client'));

// Must be last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

const port = process.env.PORT || 80;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, '0.0.0.0', () => console.log('Started'));