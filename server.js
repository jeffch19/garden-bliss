const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const homeRoutes = require('./controllers/homeRoutes');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const plantRoutes = require('./controllers/api/plant.js');


const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


const hbs = exphbs.create({ helpers: helpers });

app.use(session(sess));

//app.engine('handlebars', hbs.engine);
app.engine('handlebars', hbs.engine);
// const hbs = exphbs.create({});
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', plantRoutes);


//authenticating the database
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});


// Use homeRoutes for routes starting with "/home"
app.use('/home', homeRoutes);

// Use other routes defined in the "controllers" module
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`-------------------------------------App is listening on port ${PORT}!`)
  });
});
