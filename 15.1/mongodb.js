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

    // db.collection('restaurants').insertOne({
    //     name: 'Guy',
    //     ageL: 28
    // },(err,res) => {
    //     if(err) {
    //         console.log('Unable to insert user.');
    //     }
    //     console.log(res.ops);
    // })

    // db.collection('restaurants').findOne({ _id: new ObjectID('607d7e37cf220933dc31b91b') }, (err, res) => {
    //     console.log(res);
    // })
    // ---------------------

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


})