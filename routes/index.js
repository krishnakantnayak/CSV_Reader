//routes for all features
const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');
const csv_controller=require('../controllers/csv_controller')


router.get('/',home_controller.home);
router.post('/save_file',home_controller.savefile);
router.get('/show_csv',csv_controller.csvEditor);
router.post('/show_csv',csv_controller.csvEditor);

module.exports=router;