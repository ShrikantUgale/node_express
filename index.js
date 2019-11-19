const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
var cors = require('cors')



// Init App
const app = express();

const PORT = process.env.PORT || 8080;


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//CORS Middleware
app.use(cors());

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));



// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get('/', function(req, res){
//   res.render('signup');
    res.send("Signup page").status(200);

});

// Route Files
let users = require('./routes/users');
app.use('/users', users);

// Start Server
app.listen(PORT, function(){
  console.log(`Server started on ${PORT}`);
});