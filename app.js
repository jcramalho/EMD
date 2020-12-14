var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/emd', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Autenticação
const { v4: uuidv4 } = require('uuid');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var flash = require('connect-flash')
var bcrypt = require('bcryptjs')
//-----------------------------------


// Configuração da estratégia local
var User = require('./controllers/user')
passport.use(new LocalStrategy(
  {usernameField: 'email'}, (email, password, done) => {
  User.consultar(email)
    .then(dados => {
      const user = dados.data
      if(!user) { return done(null, false, {message: 'Utilizador inexistente!\n'})}
      if(!bcrypt.compareSync(password, user.password)) { return done(null, false, {message: 'Password inválida!\n'})}
      return done(null, user)
  })
  .catch(erro => done(erro))
}))

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
  console.log('Vou serializar o user: ' + JSON.stringify(user))
  // Serialização do utilizador. O passport grava o utilizador na sessão aqui.
  done(null, user.email)
})
  
// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((email, done) => {
  console.log('Vou desserializar o utilizador: ' + email)
  User.consultar(email)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})

// Autenticação com JWT---------------------------------------------
var JWTStrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractFromSession = function(req){
  var token = null
  if(req && req.session) token = req.session.token
  return token
}

var extractFromQS = function(req){
  var token = null
  token = req.query.access_token
  return token
}

passport.use(new JWTStrategy({
  secretOrKey: 'pri2019',
  jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession, extractFromQS])
}, async (token, done) => {
  try{
    return done(null, token.user)
  }
  catch(error){
    return done(error)
  }
}))

// Configuração das sessões-----------------------------------------
app.use(session({
  genid: req => {
  console.log('Dentro do middleware da sessão...')
  console.log(req.sessionID)
  return uuidv4()},
  store: new FileStore(),
  secret: 'emd@di',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var cors = require('cors')
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}

app.use(passport.initialize());
app.use(passport.session());
  
app.use(flash());

app.use(cors(corsOpts));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
