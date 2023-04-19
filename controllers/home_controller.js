const csvfiles = require('../models/csvFiles');
//controllers for home page and file saving
module.exports.home = function (req, res) {
    csvfiles.find({}).then((data) => {
        return res.render('home', {
            csvlist: data
        });
    })
}
module.exports.savefile = function (req, res) {
    console.log(req.file);
    csvfiles.uploadedFile(req, res, function (err) {
        if (err) console.log('error in multer');

        console.log(req.file);

        if (req.file && req.file.mimetype == 'text/csv') {
            csvfiles
                .create({
                    Storage: csvfiles.uploadedPath + '/' + req.file.filename,
                    display_name: req.file.originalname
                })
                .then((d) => {
                    console.log(`file stored at ${d}`);
                    res.redirect('back')
                })
                .catch((err) => { console.log(`error at ${err}`) })
        }
        else{
            res.redirect('back')
        }
    })
    
}