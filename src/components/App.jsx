import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { useLocation } from 'react-router-dom';
import './App.css'

const App = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [ListName, setListName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('location', location, "pathname:", location.pathname);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + location.pathname);
        const responseData = await response.json();
        setListName(responseData.name);
        console.log(responseData);
        setItems(responseData.tasks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [location]);

  const addItem = async (inputText) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + location.pathname, {
        method: "POST",
        body: JSON.stringify({
          list: ListName,
          task: inputText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const responseData = await response.text();
      console.log("successfully added to list", responseData);
      setItems((prevItems) => [...prevItems, { name: inputText }]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + location.pathname + '?taskId=' + id, {
        method: "DELETE"
      });
      console.log("successfully deleted from list", response.text());
      setItems((prevItems) => {
        return prevItems.filter((item) => {
          return item._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (<>
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea whenClicked={addItem} list={ListName} />
      <div>
        {items.map((todoItem, index) => (
          <ToDoItem
            key={todoItem._id}
            id={todoItem._id}
            text={todoItem.name}
            onChecked={deleteItem}
          />
        ))}
      </div>
    </div>

  </>
  );
}

export default App;
