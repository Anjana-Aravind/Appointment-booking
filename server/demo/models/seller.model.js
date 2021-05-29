const mongoose = require('mongoose');

const SellerSchema = mongoose.Schema({
    sellerName:{
        type:String
    },
    location: { 
        type:String
    },
    workingHours:{
         type:String
    },
    phoneNumber:{
        type:String
    }
});
module.exports = mongoose.model('Seller', SellerSchema)
