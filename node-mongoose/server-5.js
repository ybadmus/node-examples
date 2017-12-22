var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    var newPromo = Promotions({
        name: 'Uthapizza',
        image: 'img.jpg',
        label: 'New',
        price: '19.99',
        description: 'Featuring......'
    });

       newPromo.save(function (err) {
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Promotions.find({}, function (err, promotions) {
            if (err) throw err;

            // object of all the users
            console.log(promotions);
                    
                    //dropping document from database
                    db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });

});