// const {mongodb, MongoClient } = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'findMyRestaurant';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);


    // 1.1
    db.collection('restaurants').find({}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.2
    db.collection('restaurants').find({cuisine : "street food"}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.3
    db.collection('restaurants').find({kosher : true}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.4
     db.collection('restaurants').find({"address.city" : "Holon"}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.5
     db.collection('restaurants').find({
         "address.city" : "Tel Aviv", "address.street": "Stam Adress 15", "address.coordinates": [20.46574, -40.6774] 
        }).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.6
    db.collection('restaurants').find({
        "address.coordinates": [20.46574, -40.6774]}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.7
     db.collection('restaurants').find({}).sort({"name": 1}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.8
     db.collection('restaurants').find({}).sort({"address.city": 1}).toArray((err, res) => {
        if (err) {
            return console.log('Unable to fetch data');
        }
        console.log(res);
    })

    // 1.9
    db.collection('restaurants').updateOne({"name": 'bombay'}, {$set : {"name": "shipudei ezra + banav"}});

    // 1.10
    db.collection('restaurants').updateOne({"name": "falafel 5 shekels"}, {$addToSet :{ "reviews" : [new Date(), 5] }});

    // 1.11
    db.collection('restaurants').updateMany({},{$set: {kosher: true}});

    // 1.12
    db.collection('restaurants').deleteOne({"name": "thailand paradise"});

    // 1.13
    db.collection('restaurants').deleteMany({});

    // 1.14
    db.collection('restaurants').updateOne({ "name": "asian delight" }, { $inc: { "reviews.0.score": 2 } });

    // 1.15
    db.collection('restaurants').updateOne({ "name": "asian delight" }, { $inc: { "reviews.0.score": -1 } });

    // 2.2
    db.collection('restaurants').find({}).forEach(restaurant => console.log(restaurant.address.city));

    // 3.1
    db.collection('restaurants').find({ "name": /^r/ }).toArray((err, res) => {
        if (err) {
            return console.log('error');
        }
        console.log(res);
    })

    // 3.2
    db.collection('restaurants').countDocuments({}, ((err, res) => {
        if (err) {
            return console.log('error');
        }
        console.log(res);
    }))

    // 3.3
    db.collection('restaurants').find({reviews: {$elemMatch : {date: new Date("2020-01-01 00:00:00.000Z") }}}).toArray((err,res)=>{
        console.log(res);
    })

})