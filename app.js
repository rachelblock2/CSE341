const path = require('path');
const cors = require('cors');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');
// // "start": "nodemon app.js",
// "start": "node index.js",
//     "start:dev": "nodemon --watch"

const app = express();

const MONGODB_URI =
  'mongodb+srv://rachellof:G78bRrKWgPS7iZZ@cluster0.z8i5l.mongodb.net/shop?retryWrites=true&w=majority';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());

const corsOptions = {
  origin: "https://rachelcse341nodejs.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

// const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://rachellof:G78bRrKWgPS7iZZ@cluster0.z8i5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// app.use((req, res, next) => {
//   User.findById('61f33aafd6df2b2b7491c55d')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// this port should work for heroku
const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    MONGODB_URI, options
  ).then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Rachel',
    //       email: 'rachel@test.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });
    app.listen(PORT);
  })

  .catch(err => {
    console.log(err);
  });