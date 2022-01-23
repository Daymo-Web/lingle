import { useState, useEffect } from "react";
import scrabbleArray from "./scrabble";
import wordArray from "./words";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [scrabble, setScrabble] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [length, setLength] = useState(0);
  const [tmpLength, setTmpLength] = useState(0);
  const [word, setWord] = useState([]);
  const [wordString, setWordString] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [answer, setAnswer] = useState();
  const [valid, setValid] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    // Check if they hit the max character length
    // Check if it's not the last input field
    if (value.length === maxLength) {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      const newArray = Array.from(word);
      newArray[index] = value;
      setWord(newArray);
      if (index === length - 1) {
        setSubmitButton(true);
        return;
      }
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  };
  const crossBoard = (
    <div className="cross-board">
      <div>
        <form>
          {Array.from({ length }, (_, k) => (
            <input
              className="cross-board-input"
              type="text"
              name="name"
              key={k}
              maxLength={1}
              onChange={handleChange}
              placeholder="field 1"
            ></input>
          ))}
        </form>
      </div>
    </div>
  );

  const setWordArray = () => {
    let arr = Array(tmpLength);
    for (let i = 0; i < tmpLength; ++i) {
      arr[i] = "";
    }
    setWord(arr);
  };

  useEffect(() => {}, [words, scrabble]);

  const play = () => {
    setPlaying(true);
  };

  const filterWords = () => {
    const res = scrabbleArray.filter((s) => s.length == tmpLength);
    setScrabble(res);
    console.log(res);
  };

  const randomWord = () => {
    const res = wordArray.filter((s) => s.length == tmpLength);
    console.log(res);
    const random = res[Math.floor(Math.random() * res.length)];
    console.log(random);
    setAnswer(random);
    setWords(res);
  };

  const updateWord = () => {
    const str = word.join("");
    console.log(word);
    console.log(str);
    setWordString(str);
    if (guesses.length == 0) {
      setGuesses([word]);
    } else {
      setGuesses([...guesses, word]);
    }
    setCnt(cnt + 1);
    const isValid = checkWords(str);
    console.log("isValid", isValid);
    if (isValid) {
      console.log("Valid!");
    }
  };

  // const allSqaures = (
  //   <div className="allSquares">
  //     <div>{Array.from({ cnt }, (_, k) => ({ squares }))}</div>
  //   </div>
  // );

  const SquareGuesses = () => {
    const listGuesses = guesses.map((wordd) => (
      <li key={wordd.toString()}>{wordd}</li>
    ));
    return <ul>{listGuesses}</ul>;
  };

  const checkWords = (word) => {
    console.log(word);
    return scrabble.includes(word.toUpperCase()) || words.includes(wordString);
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
            {cnt > 0 ? (
              <div>
                <SquareGuesses />
              </div>
            ) : (
              <div></div>
            )}
            <div className="game-body">
              <div>{crossBoard}</div>
              {submitButton === true ? (
                <button onClick={updateWord}>submit now</button>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ) : playing === true ? (
          <div>
            <p>What length do you want your jingle word to be?</p>
            <form>
              <input
                type="number"
                value={tmpLength}
                onChange={(res) => setTmpLength(res.target.value)}
              />
              <input
                type="submit"
                value="Submit"
                onClick={() => {
                  setWordArray();
                  randomWord();
                  filterWords();
                  setLength(tmpLength);
                }}
              />
            </form>
          </div>
        ) : (
          <button onClick={play}>Play now</button>
        )}
      </div>
    </div>
  );
}

export default App;
