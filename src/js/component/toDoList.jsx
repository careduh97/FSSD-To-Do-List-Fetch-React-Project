import React from "react";
import { useState } from "react";

export function ListApp () {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState([]);
    const enterKey = function (event) {
        return event.code === "Enter" ? (setItems([...items, inputValue]), setInputValue("")) : "";
    };

    const deleteKey = function (indexTarget) {
        return setItems(items.filter((element, indexFilter) => indexFilter !== indexTarget))
    };

    return (
        <div className="listBody">
            <input type={"text"}
                className="mb-2" 
                onChange={event => setInputValue(event.target.value)} 
                value={inputValue} 
                onKeyDown={enterKey}
                placeholder="What needs to be done?">
            </input>

            {items.length == 0 ? 
                <ul>
                    No tasks yet. Please add some!
                </ul> 
                :
                <ul>
                    {items.map(function(element, indexMap) {
                        return (
                            <li key={indexMap}>
                                <span>{element}</span> 
                                <i onClick={event => {deleteKey(indexMap)}} className="fa-solid fa-xmark"></i>
                            </li>
                        )       
                    })}
                </ul>
            }

            <p className="footerCounter mt-2">{items.length} tasks added</p>

            {console.log(inputValue)}
            {console.log(items)}
        </div>
    )
}