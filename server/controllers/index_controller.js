import express from 'express';

var router = express.Router();
const i18next = require('i18next');


class IndexController {
   static list(req, res, next) {
    const data = {
        req: req,
        title: 'Github'
    };
    res.render('index', data);
  }
}

export default IndexController;