import React, { useEffect } from "react";
import { useState } from "react";

export function ListApp () {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState([]);
    const [buttonActive, setButtonActive] = useState(true)
    
    const enterKey = async (event) => {
        const newTask = { label: inputValue, done: false };
        if (event.code !== "Enter") {
            return;
        }
        if (inputValue.trim() !== "") {
            try {
                const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/careduh97", {
                    method: "PUT",
                    body: JSON.stringify([...items, newTask]),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (response.status == 200) {
                    getTasks();
                    setInputValue("");
                }
                else {
                    alert("Tu tarea no se guardo satisfactoriamente");
                    throw new Error (response.status);
                }
            } catch (error) {
                console.log("Estatus de error: ", error);
            }
        }
    };

    const deleteKey = async (indexTarget) => {
        let deleteTask = items.filter((element, indexFilter) => indexFilter !== indexTarget);
        if (deleteTask.length == 0){
            deleteTask = [{ label: "Sample Task", done: false }];
        }
        try {
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/careduh97", {
                method: "PUT",
                body: JSON.stringify(deleteTask),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.status == 200) {
                getTasks();
            }
            else {
                alert("Tu tarea no se pudo eliminar satisfactoriamente");
                throw new Error (response.status);
            }
        } catch(error) {
            console.log("Estatus de error: ", error);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/careduh97", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.status !== 200) {
                alert("Tu tarea no se pudo eliminar satisfactoriamente");
                throw new Error (response.status);
            }
            const userCreated = await createUser();
            if (userCreated == true) {
                await getTasks();
            }
        } catch(error) {
            console.log(error);
        }
    }

    const createUser = async () => {
        try{
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/careduh97", {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return response.status == 200
        } catch(error){
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/careduh97");
            const body = await response.json();
            console.log(body);
            setItems(body);
            setButtonActive(true);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className="listBody">
            <input type={"text"}
                className="mb-2" 
                onChange={event => setInputValue(event.target.value)} 
                value={inputValue} 
                onKeyDown={enterKey}
                placeholder="What needs to be done?">
            </input>

            {items.length == 1 ? 
                <ul>
                    No tasks yet. Please add some!
                </ul> 
                :
                <ul>
                    {items.map(function(element, indexMap) {
                        if (indexMap > 0) {
                            return (
                                <li key={indexMap}>
                                    <span>{element.label}</span> 
                                    <i onClick={event => {deleteKey(indexMap)}} className="fa-solid fa-xmark"></i>
                                </li>
                            )       
                        }
                    })}
                </ul>
            }
            
            {
                items.length > 0 ? (
                    <p className="footerCounter mt-2">{items.length - 1} tasks added</p>
                ) : ""
            }

            <button type="button" 
                onClick={() => {
                    deleteUser()
                    setButtonActive(false)
                }} 
                className="btn btn-light mt-2" 
                disabled={buttonActive ? "" : "disabled" }
            >
                Delete All Tasks
            </button>

            {console.log(inputValue)}
            {console.log(items)}
        </div>
    )
}