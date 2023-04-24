const mongoose = require('mongoose');

// get schema object from mongoose
const Schema = mongoose.Schema;

// create a structure on how data should be stored
const itemSchema = new Schema({
    name: String
});


//saves the schema for use
const Item = mongoose.model("item", itemSchema);


module.exports = {
    Item: Item,
    itemSchema: itemSchema
};