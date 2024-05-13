const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Todo')

const db = mongoose.connection

db.on('error', function (err) {
    console.log(err.message);

})

db.once('open',function(){
    const currentDate = new Date().toLocaleString();
    console.log("Succesfully connected to the database " + currentDate);
})