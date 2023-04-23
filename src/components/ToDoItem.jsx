import React from "react";
import './ToDoItem.css';

const ToDoItem = (props) => {

    const removeItem = (event) => {
        props.onChecked(event.target.id);
    }

    return [
        <div key={props.id} className="item">
            <input type="checkbox" key={props.id + 324} name="checkbox" className="checkbox" id={props.id} value='' onChange={removeItem} />
            <p key={props.id + 32231}> {props.text} </p>
        </div>
    ];
}

export default ToDoItem;
