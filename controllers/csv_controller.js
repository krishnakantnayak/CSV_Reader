const csvfiles = require('../models/csvFiles');
const path = require('path');

//below library is used to parse csv files
const csv = require('csv-parser');
//below library used for file fetching
const fs = require('fs');
let results = [];
//controllers for csv display in tabular format and querying
module.exports.csvEditor = async function (req, res) {



    if (req.xhr) {
        results=[];
        console.log('inside xhr');
        fs.createReadStream(path.join(__dirname, '../', req.body.loc))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                let headers = [];
                if (results.length) {
                    headers = Object.keys(results[0]);
                }
                let qresults = [];


                for (obj of results) {
                    let flag = true;
                    for (let i = 0; i < headers.length; i++) {
                        if ('' != req.body['vals[' + i + '][value]']) {
                            if (obj[req.body['vals[' + i + '][name]']].toString() != req.body['vals[' + i + '][value]'].toString()) {
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (flag)
                        qresults.push(obj);
                }

                return res.status(200).json({ data: qresults, headers:headers, message: 'all res fetched' });
            });

    }
    else {
        results=[];
        console.log('inside here');
        fs.createReadStream(path.join(__dirname, '../', req.query.loc))
            .pipe(csv())
            .on('data', (data) => {results.push(data);})
            .on('end', () => {
                
                let headers = [];
                if (results.length) {
                    headers = Object.keys(results[0]);
                }

                return res.render('csv-editor', { results: results, headers: headers, loc: req.query.loc,filename:req.query.filename });
            });
    }


}