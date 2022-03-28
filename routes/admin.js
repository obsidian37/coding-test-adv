const express = require('express');
const router = express.Router();
const { dbPool } = require('../db');
const jwt = require('jsonwebtoken');

const validateToken = (token) => {
  try {
    jwt.verify(token, process.env.SIGNING_KEY);
    return true;
  } catch (error) {
    return false;
  }
};
router.post('/category', async (req,res) => {
    //validate token
    if (!validateToken(req.cookies.token)) {
      res.status(404).send('Forbidden');
    }

    //attempts to insert new category
    let requestCategory = req ? req.query['category'] : null;
    if (requestCategory) {
      try {
        const response = await dbPool.query(`INSERT INTO animal_categories(category) values ${requestCategory} returning *`);
        
        res.status(200).send({category: response.rows});

      } catch (error) {
        res.status(500).send('Internal Server Error: '+error);
      } 
    } else {
      res.status(403).send('Invalid params.');
    };

});

router.delete('/category', async (req,res) => {
  //validate token
  if (!validateToken(req.cookies.token)) {
    res.status(404).send('Forbidden');
  }

  //attempts to insert new category
  let requestCategory = req ? req.query['category'] : null;
  if (requestCategory) {
    try {
      const response = await dbPool.query(`DELETE FROM animal_categories where category ='${requestCategory}'`);

      res.status(200).send('Successful in deleting '+requestCategory);

    } catch (error) {
      res.status(500).send('Internal Server Error: '+error);
    } 
  } else {
    res.status(403).send('Invalid params.');
  };

});

module.exports = router;