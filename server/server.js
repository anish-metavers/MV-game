require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const databaseConnection = require('./model/database/db');
const path = require('path');

// middlewares
app.use(
   cors({
      origin: '*',
   })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(
   helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
         'img-src': ["'self'", 'https: data:'],
      },
   })
);
app.use(express.static(path.join(path.resolve(__dirname), 'build')));

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
   );
   next();
});

if (process.env.NODE_ENV == 'production') {
   // for build file
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
   });
}

const adminRoute = require('./routes/adminRoute');
const adminToolsRoute = require('./routes/adminToolsRoute');

app.use('/admin', adminRoute);
app.use('/admin-tools', adminToolsRoute);

// for build file
app.get('*', (req, res) => {
   res.sendFile(path.join(path.resolve(__dirname), 'build', 'index.html'));
});

// In this case it is an HTTP server
// database connection function
databaseConnection(() => {
   // server listen
   server.listen(port, () => {
      console.log(`server is running in port ${port}`);
   });
});
