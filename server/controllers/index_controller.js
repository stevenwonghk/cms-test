import express from 'express';

var router = express.Router();
const i18next = require('i18next');


class IndexController {
   static list(req, res, next) {
    console.log('IndexController.list');
    res.render('index', { title: 'Express'});
  }
}

export default IndexController;