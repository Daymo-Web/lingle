import { useState, useEffect } from "react";
import scrabbleArray from "./scrabble";
import wordArray from "./words";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [scrabble, setScrabble] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [wordLengthInput, setWordLengthInput] = useState(0);
  const [length, setLength] = useState(0);
  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    // Check if they hit the max character length
    console.log("value.length", value.length);
    if (value.length === maxLength) {
      // Check if it's not the last input field
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  };
  const crossBoard = (
    <div className="cross-board">
      <div>
        <form>
          <tbody>
            {Array.from({ length }, (_, k) => (
              <input
                type="text"
                name="name"
                maxLength={1}
                onChange={handleChange}
                placeholder="field 1"
              ></input>
            ))}
          </tbody>
        </form>
      </div>
    </div>
  );

  useEffect(() => {
    getWords();
    getScrabble();
  }, [words, scrabble]);

  const getWords = () => {
    setWords(wordArray);
  };
  const getScrabble = () => {
    setScrabble(scrabbleArray);
  };
  const play = () => {
    setPlaying(true);
  };
  return (
    <div className="App">
      <div>
        <p>Wordle :D</p>
      </div>
      <div>
        {length > 0 ? (
          <div>
            <div className="game-header">
              <p>Okay let's start this mofo</p>
            </div>
            <div className="game-body">{crossBoard}</div>
          </div>
        ) : playing === true ? (
          <div>
            <p>What length do you want your jingle word to be?</p>
            <label>
              <input
                type="number"
                value={wordLengthInput}
                onChange={(res) => {
                  setWordLengthInput(res.target.value);
                }}
              />
            </label>
            <button onClick={() => setLength(wordLengthInput)}>Submit</button>
          </div>
        ) : (
          <button onClick={play}>Play now</button>
        )}
      </div>
    </div>
  );
}

export default App;
