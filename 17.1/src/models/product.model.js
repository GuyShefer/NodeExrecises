const mongoose = require('mongoose');

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

module.exports = Product;