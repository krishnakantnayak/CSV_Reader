//mongoose library configured
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CSV_Files_DB');
const db=mongoose.connection;

db.on('error',console.error.bind(console.log('error connrcting to db')));
db.once('open',function(){
    console.log('sucessfully connected to db');
})