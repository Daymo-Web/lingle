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
  const [debug, setDebug] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [wordHash, setWordHash] = useState({});
  const [hashList, setHashList] = useState([]);
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
  const handleBackspace = (e) => {
    const { maxLength, value, name } = e.target;
    if (value.length === 0) {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      const newArray = Array.from(word);
      newArray[index] = "";
      setWord(newArray);
      if (index !== 0) {
        form.elements[index - 1].focus();
      }

      e.preventDefault();
      console.log(index);
    }
  };
  const handleLeft = (e) => {
    const form = e.target.form;
    const index = [...form].indexOf(e.target);

    if (index !== 0) {
      form.elements[index - 1].focus();
    }

    e.preventDefault();
    console.log(index);
  };
  const handleRight = (e) => {
    const form = e.target.form;
    const index = [...form].indexOf(e.target);

    if (index !== length - 1) {
      form.elements[index + 1].focus();
    }

    e.preventDefault();
    console.log(index);
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
              defaultValue={""}
              maxLength={1}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  handleBackspace(e);
                } else if (e.keyCode === 37) {
                  handleLeft(e);
                } else if (e.keyCode === 39) {
                  handleRight(e);
                }
              }}
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
    setWordString(str);

    if (str == answer) {
      setCorrect(true);
      console.log("Correct!!!!!!!");
    }
    const isValid = checkWords(str);
    if (isValid) {
      setDebug(false);
      backend(str);
      if (guesses.length == 0) {
        setGuesses([word]);
      } else {
        setGuesses([...guesses, word]);
      }
      setCnt(cnt + 1);
    } else {
      setDebug(true);
    }
    // let newArray = Array.from(word);
    // for (let i = 0; i < length; ++i) {
    //   newArray[i] = "";
    // }
    // setWord(newArray);
  };

  // const allSqaures = (
  //   <div className="allSquares">
  //     <div>{Array.from({ cnt }, (_, k) => ({ squares }))}</div>
  //   </div>
  // );

  const SquareGuesses = () => {
    let fullStr = [];
    for (let i = 0; i < guesses.length; ++i) {
      let currGuess = guesses[i];
      fullStr.push(
        <div>
          <div className="parent">
            {Array.from({ length }, (_, k) => (
              <div
                style={{ backgroundColor: hashList[i][k] }}
                className="child inline-block-child"
              >
                {currGuess[k].toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return fullStr;
  };

  const checkWords = (str) => {
    return (scrabble.includes(str.toUpperCase()) || words.includes(str));
  };

  let dictionary = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  let dictionary2 = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };

  let wordMap = [];

  const backend = (wordString) => {
    for (let i = 0; i < wordString.length; ++i) {
      let idxStr = i.toString();
      wordMap.push("");
    }
    for (let i = 0; i < answer.length; ++i) {
      ++dictionary[answer.charAt(i)];
    }
    let tmpDict = dictionary;
    for (let i = 0; i < wordString.length; ++i) {
      dictionary2[wordString.charAt(i)].push(i);
    }
    for (let i = 0; i < wordString.length; ++i) {
      let currLetter = wordString.charAt(i);
      if (wordMap[i] == "") {
        if (tmpDict[currLetter] == 0) {
          for (let j = 0; j < dictionary2[currLetter].length; ++j) {
            wordMap[dictionary2[currLetter][j]] = "grey";
          }
        } else if (dictionary2[currLetter].length == 1) {
          if (currLetter == answer.charAt(i)) {
            wordMap[i] = "green";
          } else {
            wordMap[i] = "yellow";
          }
        } else {
          let tmpLst = dictionary2[currLetter];
          let tmpLst2 = tmpLst;
          for (let j = 0; j < tmpLst2.length; ++j) {
            let k = tmpLst2[j];
            if (currLetter == answer.charAt(k)) {
              tmpDict[currLetter] -= 1;
              tmpLst = tmpLst.filter((i) => i !== k);
              wordMap[k] = "green";
            }
          }
          tmpLst2 = tmpLst;
          for (let j = 0; j < tmpLst2.length; ++j) {
            let k = tmpLst[j];
            if (tmpDict[currLetter] <= 0) {
              wordMap[k] = "grey";
            } else {
              tmpDict[currLetter] -= 1;
              wordMap[k] = "yellow";
            }
          }
        }
      }
    }
    setWordHash(wordMap);
    let hashy = hashList;
    hashy.push(wordMap);
    setHashList(hashy);
  };

  return (
    <div className="App">
      <div>
        <h1>You are playing Lingle!</h1>
      </div>
      <div>
        {length > 0 ? (
          <div>
            {correct ? (
              <div>
                <h1>You Win!</h1>
              </div>
            ) : (
              <div></div>
            )}
            {cnt > 0 ? (
              <div className="square-guesses">
                <SquareGuesses />
              </div>
            ) : (
              <div></div>
            )}
            <div className="game-body">
              <div>{crossBoard}</div>
              {submitButton === true && debug === true ? (
                <div>
                  <button onClick={updateWord}>submit now</button>
                  <h3>Hey! That is not a valid word! Try again :(</h3>
                </div>
              ) : submitButton === true ? (
                <button onClick={updateWord}>submit now</button>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ) : playing === true ? (
          <div>
            <h2>Select Lingle word length: </h2>
            <form>
              <input class="numbox"
                type="number"
                value={tmpLength}
                onChange={(res) => setTmpLength(res.target.value)}
              />
              <input class="subbox"
                type="submit"
                value="Submit"
                onClick={(event) => {
                  setWordArray();
                  randomWord();
                  filterWords();
                  setLength(tmpLength);
                  event.preventDefault();
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
