var express = require('express');
var bodyParser = require('body-parser');
var ldapDownload = require('./clientTest');
var mongodbHelper = require('./mongodb/mongodbHelper.js');
var uuid = require('node-uuid');
 

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var entries =[];

var resultFunc2 = function(err, result){
    if(result.length)
    {
        for(var i =0 ; i < result.length; i++)
        {
             console.log(JSON.stringify(result[i]));
             console.log('\r\n');
        }
    }
}

var resultFunc = function(err, result){
    if(result.length)
    {
        for(var i =0 ; i < result.length; i++)
        {
             var qId = result[i].queryId;
             console.log(qId);
             mongodbHelper.findObjects({queryId:qId},'ldap', resultFunc2);
             console.log('\r\n');
             //return;
        }
    }
}


app.get('/',function(req, res){
    ldapDownload.ldapFetch();
    //var ent = mongodbHelper.findObjectsv2({dnGroup:'OU=MaryTest,DC=Testing,DC=com', expireTime: { $gt: new Date()} },'stamps', resultFunc2);
    //var ent = mongodbHelper.findObjectsWithResults({dnGroup:'OU=MaryTest,DC=Testing,DC=com', 'expireTime': { $gt: new Date()} },'stamps');
    //mongodbHelper.findObjectsWithResults({ dnGroup:'OU=MaryTest,DC=Testing,DC=com' , expireTime: { $gt: new Date()}},'stamps', resultFunc);
    res.status(200).send('Good');
});

app.post('/ldaptrigger',function(req, res){
    mongodbHelper.findObject({},'ldap',resultFunc);
    res.send(entries.length + ' ' +JSON.stringify(entries));
    //console.log(JSON.stringify(req.body))
    //console.log(req.body);
});

app.listen(3300);