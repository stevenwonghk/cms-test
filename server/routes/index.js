import express from 'express';
import IndexController from '../controllers/index_controller';
import MongooseController from '../controllers/mongoose_controller';
var router = express.Router();

/* GET home page. */
router.get('/', IndexController.list);
router.get('/mongoose', MongooseController.list);

export default router;
