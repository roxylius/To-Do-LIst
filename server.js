const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const { Item } = require('./schema/item');
const List = require("./schema/list");
const defaultItems = require('./views/defaultItems');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
let port = process.env.PORT || 3000;
server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));


// for web deployment 
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("successfully connected to mongoDB sever!");
    server.listen(3000, () => {
      if (port == null)
        console.log("Server started on port:" + port + "....");
      else
        console.log("Server started on " + port);
    });


  }
});

//handles all the request with different table name
server.get('/:listName', (req, res) => {
  //capitalizes listname
  const listName = _.capitalize(req.params.listName);

  console.log("listname: ", listName, "req.params: ", req.params);

  //finds the list if doesn't exist creates one
  List.findOne({ name: listName }, (err, list) => {
    if (!err)
      if (!list) {
        const list = new List({
          name: listName,
          tasks: defaultItems
        });

        list.save()
          .then(() => {
            console.log("List saved successfully!!");
            res.json(list);
          })
          .catch((err) => {
            if (err)
              console.log("Err saving list: ", err);
          });
      } else {
        //if the list already exist then display this list
        res.json(list);
      }
  });
})

  .post('/:listName', (req, res) => {
    const { task } = req.body;
    const list = _.capitalize(req.body.list);

    //find the list and adds task to it
    List.findOne({ name: list }, (err, foundList) => {
      if (!err)
        if (foundList) {
          const newTask = new Item({ name: task });

          foundList.tasks.push(newTask);
          foundList.save()
            .then(() => {
              console.log("successfully added to list!!")

              //return 200 status code on succesful addition of task
              res.status(200).send("Successfully Added");
            })
            .catch((err) => {
              if (err) {
                console.log(err);

                //return error if the task didn't add
                res.status(400).send("Error in Adding task");
              }
            });
        }
    });
  })

  .delete('/:listName', (req, res) => {

    const taskId = req.query.taskId;
    const list = _.capitalize(req.params.listName);
    console.log("list: ", list, "taskId: ", taskId)
    //find the list and and pull/deletes the task and save the list
    List.findOne({ name: list }, (err, foundList) => {
      if (!err)
        if (foundList) {
          foundList.tasks.pull({ _id: taskId });

          foundList.save()
            .then(() => {
              console.log("Successfully removed task")
              res.status(200).send("Success in Removing task!");

              if (foundList.tasks.length === 0) {
                foundList.tasks.push(...defaultItems);
                foundList.save();
              }
            })
            .catch((err) => {
              console.log("There was an error: ", err);
              res.status(400).send("Error in Removing task!");
            });
        }
    });
  });


//handles request made to default route
server.get('/', (req, res) => {
  const listName = "Today";

  List.findOne({ name: listName }, (err, list) => {
    if (!err)
      if (!list) {
        const list = new List({
          name: listName,
          tasks: defaultItems
        });

        list.save()
          .then(() => {
            console.log("List saved successfully!!")

            //sends the list json
            res.json(list);
          })
          .catch((err) => {
            if (err) {
              console.log("Err saving list: ", err);
              res.status(400).send("Error in saving!");
            }
          });
      }
      else {
        //sends the list json if the list already exists
        res.json(list);

      }

  });

})

  .post('/', (req, res) => {
    const { task } = req.body;
    const list = _.capitalize(req.body.list);

    const newTask = new Item({ name: task });
    console.log("list: ", list, "task: ", task);

    List.findOne({ name: list }, (err, foundList) => {
      if (!err)
        if (foundList) {
          console.log("found list");

          foundList.tasks.push(newTask);

          foundList.save()
            .then(() => {
              console.log("succesfully saved to database!")

              //send as response to request on success
              res.status(200).send("Successfully Added to DB");
            })
            .catch(err => {
              console.log("Successfully! Deleted from database!")

              //send as response to request on failure
              res.status(400).send("Error! Task Removed from DB")
            });
        }
    });
  })

  .delete('/', (req, res) => {
    const listName = "Today";
    const taskId = req.query.taskId;

    List.findOne({ name: listName }, (err, foundList) => {
      if (!err)
        if (foundList) {
          //pulls the task by id
          foundList.tasks.pull({ _id: taskId });

          //saves the list after pulling task
          foundList.save()
            .then(() => {
              console.log("Successfully removed task")
              res.status(200).send("Success in Removing task!");

              // if foundLists tasks are empty then push/add default tasks
              if (foundList.tasks.length === 0) {
                foundList.tasks.push(...defaultItems);

                //saves default tasks
                foundList.save();
              }
            })
            .catch((err) => {
              //if there is error in deleting task
              console.log("There was an error: ", err);
              res.status(400).send("Error in Removing task!");
            });;
        }
    })
  })
