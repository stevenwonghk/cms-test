import express from 'express';
import IndexController from '../controllers/index_controller';
var router = express.Router();

/* GET home page. */
router.get('/*', IndexController.list);

export default router;
