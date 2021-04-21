const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-site', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then (() => {
    console.log('connected succsessful');
})
