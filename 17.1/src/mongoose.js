const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-site', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Product = mongoose.model('product', {
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
    },
    details: {
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        discount: {
            type: Number,
            min: 0,
            default: 0
        },
        images: {
            type: Array,
            validator(value) {
                if(value.length < 2){
                    throw new Error('Array must conatin 2 elements at least.')
                }
            }
        },
        phone: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default : Date.now
        }
    }
})

const product1 = new Product({
    name: 'Iphone13',
    category : 'Electricity',
    isActive: true,
    details : {
        description: "asdasd asdasd asdasd",
        price: 50,
        discount: 10,
        images: ['asdasdasd', 'asdasdasd'],
        phone: '0501234567',  
    }
})

product1.save().then(() => {
    console.log(product1);
}).catch((err) => {
    console.log('Error', err);
})