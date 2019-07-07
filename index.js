const bodyParser = require('body-parser');
const app = require('express')();
const path = require('path');

const logger = require('./lib/logger');

const microServiceName = process.env.microServiceName || 'cs-silverbar-service';
logger.addTarget('cs-silverbar-service'); // Service Name in logs

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const basePath = '/api';

const register = require('./routes/register');
const cancel = require('./routes/cancel');
const summary = require('./routes/summary');

// Debug middleware that just logs things and passes the req through
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} to ${req.originalUrl}`);
  if (process.env.DEBUG) {
    logger.info('"Enhanced" Debug On');
    logger.info('req.headers -> %j', req.headers);
    logger.info('req.body -> %j', req.body);
  }
  next();
});

app.use(path.join(basePath, 'register'), register);
app.use(path.join(basePath, 'cancel'), cancel);
app.use(path.join(basePath, 'summary'), summary);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  } else {
    res.status(400).send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`${microServiceName} service available at http://localhost:${port}`);
  logger.info('Available APIs: /api/register[POST]|/api/cancel[POST]|/api/summary[GET]');
});
