const express = require('express');
const expressWinston = require('express-winston');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const { dbPool } = require('./db');

//async functions
const dbQuery = async (query) => {
  try {
    const response = await dbPool.query(query);
    return response.rows;
  } catch (error) {
    throw new Error(error);
  }
};


const createApp = (logger) => {
  const app = express();

  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // TODO: Serve your React App using the express server
  const buildPath = path.normalize(path.join(__dirname, './client/build'));

  //routers
  app.use('/auth', authRouter);
  app.use('/admin', adminRouter);

  app.use(express.static(buildPath));

  /*
   * Main Endpoints
  */
  //GET METHODS
  app.get("/category/getAllCategories", (req,res) => {

    dbQuery('SELECT * FROM animal_categories').then((response) => {
      const allCategories = [];
      for (const row of response) {
        allCategories.push(row['category']);
      }
      res.status(200).send({categories: allCategories});

    });

    
  })
  app.get("/photo/getUrls", (req,res) => {
    let requestedCategories = req ? req.query['categories'] : null;

    if (requestedCategories) {
      //convert it to query format (with quotation  marks wrapped around each WHERE condition for categories)
      requestedCategories = "'"+requestedCategories.replace(",","','")+"'";
      dbQuery(`SELECT * FROM animal_photos INNER JOIN animal_categories ON category_id = animal_categories.id where category in (${requestedCategories})`).then((response) => {
        const allUrls = [];
        for (const row of response) {
          allUrls.push(row['photo_url']);
        }
        res.status(200).send({urls: allUrls});
  
      });
    } else {
      res.status(403).send('Invalid params.');
    }

  })

  /*
   * Others
  */
  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  // error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
  });

  return app;
};

module.exports = createApp;
