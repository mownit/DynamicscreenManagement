
'use strict';

const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
var config = require('./configuration/environment')
var url = require('url')
const fs = require('fs')
var app = express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use('*', cors())

// created by Tenneti Mownika
//created on 12-11-2020
// @api for Dynamic screen management 
//@api displays data of dynamic files given by user as input 

app.get('/get_meta_data/:modulename/:screenname', (req, res) => {

    console.log(req.params)    // check params data
    console.log(req.params.modulename) // check modulename from params
    console.log(req.params.screenname)  // check screenname from params



    fs.readdir('specification/' + req.params.modulename, (err, filename) => { //check if directory with  given modulename exists
        if (err) throw err
        else {
            console.log(filename)
            filename.forEach(file => {   //get all  files if more number of files there
                console.log(file)
                let displayfile = file.split('.').slice(0, -1).join('.')  //remove extension of file

                if (displayfile === req.params.screenname) {   // compare filenames without extensions
                    console.log(req.params.modulename, 'modulenameee')
                    console.log(file, 'fileee')
                    fs.readFile('specification' + '/' + req.params.modulename + '/' + file, (err, data) => {   //  read file dyanamically and return data as response
                        if (err) throw err;
                        else {
                            res.status(200).send(data)

                        }

                    })
                }
            })

        }
    })
})


app.listen(config.port,config.ip, () => {
    console.log(config.port)
    console.log('server has started')
})


