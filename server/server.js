// Server File

// Packages Used
const express = require('express'); // for HTTP requests
const mongoose = require('mongoose'); // for Object Document Modelling
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fsPROMISES = require("fs").promises;

const methodOverride = require('method-override');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // http://localhost:5000

app.use(express.json({limit: '200mb'}));

app.use(cors()); // it enables all cors requests

app.use(methodOverride('_method'));

//MongoDB connection string 
const uri = [mongoDBstring]

mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));

//connect to mongoDB
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");


  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
  app.use(bodyParser.json({limit: '100mb'}))


  //import routes
  //format:
  //const [routerName] = require('path of route file')


  //insert routes here
  //format:
  //app.use('/[routename]', [routerName])


  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

  app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
  });

})

