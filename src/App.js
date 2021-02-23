import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "f5217485";
  const APP_KEY = "6eea02c718d983312260a54e0537286e";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const response = await fetch(url);
      const result = await response.json();
      if (!result.more) {
        return setAlert("No food with such name!");
      }
      setAlert("");
      setRecipes(result.hits);
      console.log(result);
    } else {
      setAlert("Please fill the form !");
    }
  };
  /*
  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
    */
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    setQuery("");
  };
  const onChange = (e) => {
    setQuery(e.target.value);
    // console.log(query);
  };
  return (
    <div className="App">
      <h1>FOOD RECIPE APPLICATION</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" ? <Alert alert={alert} /> : alert}

        <input
          type="text"
          placeholder="Search For Food..."
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="SEARCH" />
      </form>

      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
