const express = require('express'),
    http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/dishes', dishRouter);

app.all('/dishes', (req, res) => {
  res.statusCode = 200;
  res.setHeader('content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req, res, next) => {
  res.end('will send all the dishes to you');
});

app.post('/dishes', (req, res, next) => {
  res.end('Will add the dishe: ' + req.body.name + 'with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res,end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all nodes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});