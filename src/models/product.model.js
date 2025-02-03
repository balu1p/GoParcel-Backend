const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    productWidth: {
        type: String,
        required: true,
    },
    productHeight: {
        type: String,
        required: true
    },
    productWeight: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
);


module.exports = mongoose.model("Product", productModel);