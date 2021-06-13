import * as express from 'express';
import {verifyTokenMiddleware} from './src/middleware/auth'
const bp = require('body-parser')

//dbs
import { connect } from 'http2';
import models, { connectDB } from './src/db/dbConnetion';

//
import * as cors  from 'cors';

//dotenv
import * as dotenv from 'dotenv';
dotenv.config();

//routes
import userRoutes from './src/routes/userRoutes';


const app = express();

app.use(cors({ origin: '*' })); //!!! don't remove me
app.use(express.static('client/src'))

//body parser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/', userRoutes); //login & logout
app.use(verifyTokenMiddleware);

app.use(express.json());

// parse application/x-www-form-urlencoded

// parse application/json




app.set("view engine", "ejs"); //pics????

// var multer = require('multer');//????????




//server
const PORT = 3000;
connectDB()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Issue tracker listening at http://localhost:%s!', PORT);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
  