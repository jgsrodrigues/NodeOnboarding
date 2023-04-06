const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/passport-jwt', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./src/auth/auth');

const routes = require('./src/routes/routes');
const secureRoute = require('./src/routes/secure-routes');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use('/uploads', express.static('uploads'))
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3001, () => {
  console.log('Server started.')
});
