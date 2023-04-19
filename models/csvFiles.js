//paths to csv will b stored in mongo db using mongoose
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const csvDir = path.join('/uploads/csvFiles');
//schema for file paths
const csvSchema = new mongoose.Schema({
    Storage: {
        type: String,
        required: true
    },
    display_name:{
        type:String,
        required:true
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', csvDir))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

csvSchema.statics.uploadedFile = multer({ storage: storage }).single('csvfile');
csvSchema.statics.uploadedPath = csvDir;


const CsvFile = mongoose.model('CsvFile', csvSchema);
module.exports=CsvFile;