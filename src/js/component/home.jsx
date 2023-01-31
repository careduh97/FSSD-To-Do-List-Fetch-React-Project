import React from "react";
import { ListApp } from "./toDoList.jsx";

//create your first component
const Home = () => {
	return (
		<React.Fragment>
			<h1><b>TO DO LIST</b></h1>
			<ListApp />
		</React.Fragment>
	);
};

export default Home;
