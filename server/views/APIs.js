const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const _ = require("lodash");
require("dotenv").config();
const cors = require('cors');
const { Item, itemSchema } = require('../schema/item');
const List = require('../schema/list');
const defaultItems = require('./defaultItems');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);


app.get("/:ListID", function (req, res) {
    console.log(req.params);
    Item.find({}, (err, tasks) => {
        if (err)
            console.log(err);

        if (tasks.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Successfully added the default items to database!");
            });
        }
        else {
            // console.log(tasks);
            res.render("list", { listTitle: "Today", newListItems: tasks });
        }
    });

});

app.post("/:ListID", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newTask = new Item({ name: itemName });

    if (listName === "Today") {
        newTask.save(newTask, (err) => {
            if (err)
                throw err;
            else
                console.log("Successfully Added the new task!");
        });

        res.redirect("/:ListID");
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            if (err)
                throw err;
            else {
                foundList.tasks.push(newTask);
                foundList.save();
                console.log("Added new task to ", listName, "!");
                res.redirect(`/${listName}`);
            }
        })
    }

});

app.post("/:ListIDdelete", (req, res) => {

    const taskId = req.body.checkbox;
    const listName = req.body.list;
    console.log(listName);

    console.log("To be deleted id: ", taskId);

    if (listName === "Today") {
        Item.findByIdAndDelete(taskId, (err) => {
            if (err)
                throw err;
            else
                console.log("succesfully deleted task!");
        });
        res.redirect("/:ListID");

    }
    else {
        List.findOne({ name: listName }, (err, foundList) => {
            if (err)
                throw err;
            else {
                foundList.tasks.pull({ _id: taskId });
                foundList.save();
                console.log("Successfully deleted the task!");
            }
        });

        res.redirect(`/${listName}`);
    }
});

app.get("/:ListID:listType", (req, res) => {
    const category = _.capitalize(req.params.listType);
    console.log(category);

    List.findOne({ name: category }, (err, list) => {
        if (!err) {
            if (!list) {
                const list = new List({
                    name: category,
                    tasks: defaultItems
                });

                list.save()
                    .then(() => console.log("List saved successfully!!"))
                    .catch((err) => {
                        if (err)
                            console.log("Err saving list: ", err);
                    });
            }
            else if (list.tasks.length === 0) {
                let i = 0;
                defaultItems.forEach(element => {
                    list.tasks.push(defaultItems[i++]);
                });
                list.save();
                res.redirect(`/${category}`);
            }
            else {
                res.render("list", { listTitle: list.name, newListItems: list.tasks });
            }
        }
        else
            throw err;

    });
})

