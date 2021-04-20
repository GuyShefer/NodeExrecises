const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-site', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then (() => {
    console.log('connected succsessful');
})


// const product1 = new Product({
//     name: 'Iphone13',
//     category : 'Electricity',
//     isActive: true,
//     details : {
//         description: "asdasd asdasd asdasd",
//         price: 50,
//         discount: 10,
//         images: ['asdasdasd', 'asdasdasd'],
//         phone: '0501234567',  
//     }
// })

// product1.save().then(() => {
//     console.log(product1);
// }).catch((err) => {
//     console.log('Error', err);
// })