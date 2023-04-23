const { Item, itemSchema } = require('../schema/item');

const item1 = new Item({
    name: "Welcome to your To-Do List!"
});

const item2 = new Item({
    name: "HIT  the + Button to add a new task."
});

const item3 = new Item({
    name: "⟵ Hit this to delete a task."
});

const defaultItems = [item1, item2, item3];


module.exports = defaultItems;