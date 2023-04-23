// import React, { useState, useEffect } from "react";
// import ToDoItem from "./ToDoItem";
// import InputArea from "./InputArea";
// // import Sidebar from "./Sidebar.jsx";
// import { useLocation } from 'react-router-dom';
// import './App.css'

// const App = () => {
//   const location = useLocation();

//   const [items, setItems] = useState([]);


//   //data to store the json response and set the list name
//   const [ListName, setListName] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('location', location, "pathname:", location.pathname);

//       //makes a get request and fetches the data of list and its tasks
//       const response = await fetch('http://localhost:3000' + location.pathname);

//       //takes the json that it sends it response
//       const responseData = await response.json();
//       setListName(responseData.name);
//       console.log(responseData);

//       // Update items state here with the fetched data only tasks
//       setItems(responseData.tasks);
//     }
//     fetchData();
//   }, [location]);

//   const addItem = (inputText) => {
//     //makes a post request to add the task to the list
//     fetch('http://localhost:3000' + location.pathname, {
//       method: "POST",
//       body: JSON.stringify({
//         list: ListName,
//         task: inputText,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       }
//     })
//       .then((response) => console.log("successfully added to list", response.text()))
//       .catch((err) => console.log(err));


//   };

//   const deleteItem = (id) => {

//     //makes a delete request to delete the task from the list
//     fetch('http://localhost:3000' + location.pathname + '?taskId=' + id, {
//       method: "DELETE"
//     }).then((response) => console.log("successfully deleted from list", response.text()))
//       .catch((err) => console.log(err));

//     // setItems((prevItems) => {
//     //   return prevItems.filter((item, index) => {
//     //     return index !== id;
//     //   });
//     // });
//   }

//   return (<>
//     {/* <Sidebar /> */}
//     <div className="container">
//       <div className="heading">
//         <h1>To-Do List</h1>
//       </div>
//       <InputArea whenClicked={addItem} list={ListName} />
//       <div>
//         {items.map((todoItem, index) => (
//           <ToDoItem
//             key={todoItem._id}
//             id={todoItem._id}
//             text={todoItem.name}
//             onChecked={deleteItem}
//           />
//         ))}
//       </div>
//     </div>

//   </>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import ToDoItem from "./ToDoItem";
// import InputArea from "./InputArea";
// // import Sidebar from "./Sidebar.jsx";
// import { useLocation } from 'react-router-dom';
// import './App.css'

// const App = () => {
//   const location = useLocation();

//   const [items, setItems] = useState([]);


//   //data to store the json response and set the list name
//   const [ListName, setListName] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log('location', location, "pathname:", location.pathname);

//       //makes a get request and fetches the data of list and its tasks
//       const response = await fetch('http://localhost:3000' + location.pathname);

//       //takes the json that it sends it response
//       const responseData = await response.json();
//       setListName(responseData.name);
//       console.log(responseData);

//       // Update items state here with the fetched data only tasks
//       setItems(responseData.tasks);
//     }
//     fetchData();
//   }, [location]);

//   const addItem = async (inputText) => {
//     try {
//       const response = await fetch('http://localhost:3000' + location.pathname, {
//         method: "POST",
//         body: JSON.stringify({
//           list: ListName,
//           task: inputText,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         }
//       });
//       const responseData = await response.text();
//       console.log("successfully added to list", responseData);
//       setItems((prevItems) => [...prevItems, { name: inputText }]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteItem = async (id) => {
//     try {
//       const response = await fetch('http://localhost:3000' + location.pathname + '?taskId=' + id, {
//         method: "DELETE"
//       });
//       console.log("successfully deleted from list", response.text());
//       setItems((prevItems) => {
//         return prevItems.filter((item) => {
//           return item._id !== id;
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (<>
//     {/* <Sidebar /> */}
//     <div className="container">
//       <div className="heading">
//         <h1>To-Do List</h1>
//       </div>
//       <InputArea whenClicked={addItem} list={ListName} />
//       <div>
//         {items.map((todoItem) => (
//           <ToDoItem
//             key={todoItem._id}
//             id={todoItem._id}
//             text={todoItem.name}
//             onChecked={deleteItem}
//           />
//         ))}
//       </div>
//     </div>

//   </>
//   );
// }

// export default App;



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
        const response = await fetch('http://localhost:3000' + location.pathname);
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
      const response = await fetch('http://localhost:3000' + location.pathname, {
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
      const response = await fetch('http://localhost:3000' + location.pathname + '?taskId=' + id, {
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
