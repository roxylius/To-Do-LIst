import React from "react";
import "./InputArea.css";

const InputArea = (props) => {
    const [inputText, setInputText] = React.useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    return (
        <div className="form">
            <input onChange={handleChange} type="text" value={inputText} />
            <input type="hidden" name="list" value={props.list} />
            <button
                className="btn-style"
                onClick={() => {
                    props.whenClicked(inputText);
                    setInputText("");
                }}
            >
                <span>Add</span>
            </button>
        </div>
    );
}

export default InputArea;
