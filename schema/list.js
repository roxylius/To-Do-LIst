const mongoose = require('mongoose');
const { Item, itemSchema } = require('./item');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    tasks: [itemSchema]
});

const List = new mongoose.model("list", listSchema);


module.exports = List;