var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    var newLeader = Leaders({
        name: 'Peter Pan',
        image: 'images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: "CEO",
        description: 'Our CEO, Peter, . . .'
    });

       newLeader.save(function (err) {
        if (err) throw err;
        console.log('Leader created!');

        // get all the users
        Leaders.find({}, function (err, leadership) {
            if (err) throw err;

            // object of all the users
            console.log(leadership);
                    
                    //dropping document from database
                    db.collection('Leadership').drop(function () {
                db.close();
            });
        });
    });

});