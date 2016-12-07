var mongodbhelper = require('./mongodbhelper');
var mongoosehelper = require('./mongoosehelper');
var car = require('./ldapModel');


var objs = [
    { name:'Nissan', wheel : 6 },
    { name:'Ford', wheel : 8, obj:{ sub1:'dsd',movement:true} }
];



var c = new car({
    name : 'toyota',
    wheel : 6
});


var result = function(err, result){
    if(result.length)
        console.log(JSON.stringify(result));
    process.exit();
}
//mongodbhelper.insert(cars);
//mongodbhelper.find({},result);


//mongoosehelper.insertOjbect(c);
mongoosehelper.findObjects(car,{},result);

//process.exit();