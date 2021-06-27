import React, { useEffect, useState, useRef } from "react";
import "./styles/Autocomplete.css";

const Autocomplete = ({ data }) => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState();
  const currentIndex = useRef(-1);
  const [displaySuggestion, setDisplaySuggestion] = useState(false);

  useEffect(() => {
    //Display suggestions only when userinput is not empty
    if (userInput && userInput !== "") {
      setDisplaySuggestion(true);
      return;
    }

    //When userinput is empty or undefined, clear states
    setSuggestions([]);
    currentIndex.current = -1;
    setCurrentSelection();

    // if (!userInput) {
    //   setDisplaySuggestion(false);
    //   currentIndex.current = -1;
    //   setCurrentSelection();
    // }
    // if(userInput === ""){
    //   setSuggestions([]);
    // }
  }, [userInput, setDisplaySuggestion]);

  //Set index and selected item after buttons up/down.
  const setIndex = () => {
    if (currentIndex.current >= suggestions.length) currentIndex.current = 0;
    if (currentIndex.current < 0) currentIndex.current = suggestions.length - 1;

    setCurrentSelection(suggestions[currentIndex.current]);
  };

  const handleChange = (e) => {
    //Clear selection and reset index after every letter inputted
    setCurrentSelection();
    currentIndex.current = -1;

    //Get matched suggestion after users' input
    let suggested = data.filter((suggest) =>
      suggest.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSuggestions(suggested);
    setUserInput(e.target.value);
  };

  const handleKeyDown = (event) => {
    //Button down
    if (event.keyCode === 40) {
      currentIndex.current++;
      setIndex();
    }

    //Button up
    if (event.keyCode === 38) {
      currentIndex.current--;
      setIndex();
    }

    //Enter
    if (event.keyCode === 13) {
      if (!currentSelection) return;
      setUserInput(currentSelection);
      setCurrentSelection();
      currentIndex.current = -1;
      setSuggestions([]);
      setDisplaySuggestion(false);
    }
  };

  //Close suggestion list after lost focus and cleared index/selected item.
  const handleBlur = () => {
    setDisplaySuggestion(false);
    setCurrentSelection();
    currentIndex.current = -1;
  };

  //Pick suggestion after mouse click
  const handleClick = (sugg) => {
    setUserInput(sugg);
    setCurrentSelection();
    setSuggestions([]);
    setDisplaySuggestion(false);
  };

  return (
    <div className="input-container">
      <input
        onKeyDown={handleKeyDown}
        value={userInput}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {suggestions.length !== 0 && displaySuggestion ? (
        <div className="suggestion-list">
          {suggestions.map((suggestion) => (
            <div
              onMouseDown={() => handleClick(suggestion)}
              id={suggestions.indexOf(suggestion)}
              key={suggestions.indexOf(suggestion)}
              className={
                currentIndex.current === suggestions.indexOf(suggestion)
                  ? "suggestion selected"
                  : "suggestion"
              }
            >
              <strong>{suggestion.slice(0, userInput.length)}</strong>
              {suggestion.slice(userInput.length)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
