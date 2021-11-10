const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
// Documentation
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// Models
const cors = require('cors');
const User = require('./models/User');
// Controllers
const appointment_router = require('./appoitments_maker/appointment-generate');
const centerConroller = require('./controllers/centerController');
const pharmacyController = require("./controllers/PharmacyController")

const authentication = require('./controllers/authenticationController');
const { protect, restrictTo } = require('./controllers/auth-security');
const test = require('./controllers/test');

dotenv.config();

const app = express();

// Json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Database connection
const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database ------'));

// Routes
app.use('/appointments', appointment_router);
app.use('/centers', centerConroller);
app.use('/auth', authentication);
app.use('/test', protect, restrictTo('admin'), test);
app.use("/pharmacy", pharmacyController)

// Server
const port = 4000 || process.env.port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* app.get('/', async (req, res) => {
  const user = await User.create({
    name: 'skander',
  });
  user.save();
  res.send('done!');
});

});
*/

// Documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Evax-react management API',
      version: '1.0.0',
      description: `<i>Group of endpoints that manage the CRUD operations for Evax-react</i>`,
      contact: {},
      security: [{ bearerAuth: [] }],
      servers: ['http://localhost:4000/'],
    },
  },
  apis: [
    `${__dirname}/appoitments_maker/appointment-generate.js`,
    `${__dirname}/controllers/**.js`,
  ],
};

const swaggerDocs = swaggerJSDOC(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;