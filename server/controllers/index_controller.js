import express from 'express';

var router = express.Router();
const i18next = require('i18next');


class IndexController {
   static list(req, res, next) {
    console.log('IndexController.list');
    console.log(i18next.resolvedLanguage);
    console.log(req.language);
    console.log(req.languages);
    res.render('index', { title: 'Github'});
  }
}

export default IndexController;