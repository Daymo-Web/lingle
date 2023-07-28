import React, { useState, useRef, useEffect } from 'react';
import scrabbleArray from '../scrabble';
import wordArray from '../words';
import { backend } from '../backend/Logic';
import Keyboard from './Keyboard';
import ContinueModal from './ContinueModal';
import { useContinueModal } from '../hooks/useContinueModal';
// import SquareGuesses from './SquareGuesses';

const Game = () => {
  const continueModal = useContinueModal();
  let colors = [
    { label: 'Dark Mode', value: '#292132' },
    { label: 'Light Mode', value: '#ffffff' },
  ];
  let wordMap = [];

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

  const [setbgcolor, ddlvalue] = useState(colors.title);

  const [words, setWords] = useState([]);
  const [scrabble, setScrabble] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [length, setLength] = useState(0);
  const [tmpLength, setTmpLength] = useState(3);
  const [word, setWord] = useState([]);
  const [wordString, setWordString] = useState('');
  const [submitButton, setSubmitButton] = useState(false);
  const [answer, setAnswer] = useState();
  const [valid, setValid] = useState(false);
  const [debug, setDebug] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [wordHash, setWordHash] = useState({});
  const [hashList, setHashList] = useState([]);
  const input = useRef(document.forms);
  const [keys, setKeys] = useState({});
  const [show, setShow] = useState(false);

  const back = useRef(document.body.outerHTML);
  console.log('length: ', length);
  console.log('tmpLength: ', tmpLength);
  console.log('guess length: ', guesses.length);
  console.log('guesses: ', guesses);
  console.log('word: ', word);

  const setWordArray = () => {
    let arr = Array(tmpLength);
    for (let i = 0; i < tmpLength; ++i) {
      arr[i] = '';
    }
    setWord(arr);
  };

  // useEffect(() => {}, [words, scrabble]);

  const play = () => {
    setPlaying(true);
  };

  const filterWords = () => {
    const res = scrabbleArray.filter((s) => s.length == tmpLength);
    setScrabble(res);
  };

  const randomWord = () => {
    const res = wordArray.filter((s) => s.length == tmpLength);
    const random = res[Math.floor(Math.random() * res.length)];
    setAnswer(random);
    setWords(res);
    // console.log(random);
  };

  const updateWord = () => {
    const str = word.join('');
    setWordString(str);

    if (str == answer) {
      setCorrect(true);
      console.log('Correct!!!!!!!');
    }
    const isValid = checkWords(str);
    if (isValid) {
      setDebug(false);
      backend(
        str,
        answer,
        dictionary,
        dictionary2,
        wordMap,
        keys,
        setKeys,
        setWordHash,
        hashList,
        setHashList
      );
      if (guesses.length === 0) {
        setGuesses([word]);
      } else {
        setGuesses([...guesses, word]);
      }
      setCnt(cnt + 1);
    } else {
      setDebug(true);
    }
    try {
      input.current.reset();
      input.current.elements[0].focus();
    } catch (e) {
      console.log(e.error);
    }
  };

  // const allSqaures = (
  //   <div className="allSquares">
  //     <div>{Array.from({ cnt }, (_, k) => ({ squares }))}</div>
  //   </div>
  // );

  const checkWords = (str) => {
    return scrabble.includes(str.toUpperCase()) || words.includes(str);
  };

  const ddlHandle = (e) => {
    ddlvalue(e.value);
  };

  const handleChange = (e) => {
    if (e.key === 'Backspace' || e.keyCode === 37 || e.keyCode === 39) {
      return;
    }
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split('-');
    console.log(value.length);
    // Check if they hit the max character length
    // Check if it's not the last input field
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    const newArray = Array.from(word);
    if (value.length === maxLength || value) {
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
      newArray[index] = '';
      setWord(newArray);
      if (index !== 0) {
        form.elements[index - 1].focus();
      }

      e.preventDefault();
      // console.log(index);
    }
  };

  const handleLeft = (e) => {
    const form = e.target.form;
    const index = [...form].indexOf(e.target);

    if (index !== 0) {
      form.elements[index - 1].focus();
    }

    e.preventDefault();
    // console.log(index);
  };

  const handleRight = (e) => {
    const form = e.target.form;
    const index = [...form].indexOf(e.target);

    if (index !== length - 1) {
      form.elements[index + 1].focus();
    }

    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      handleBackspace(e);
    } else if (e.keyCode === 37) {
      handleLeft(e);
    } else if (e.keyCode === 39) {
      handleRight(e);
    } else if (e.key === 'Enter') {
      handleChange(e);
      updateWord(e);
    }
  };
  const crossBoard = (
    <div className="cross-board" on>
      <div>
        <form id="cross" ref={input}>
          {Array.from({ length: length }, (_, k) => (
            <input
              className={
                length - 1 !== k
                  ? `cross-board-input`
                  : `cross-board-input-right`
              }
              id={`cross-board-input-${k}`}
              type="text"
              name="name"
              key={k}
              defaultValue={''}
              maxLength={1}
              onInput={handleChange}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ))}
        </form>
      </div>
    </div>
  );

  const playAgain = () => {
    setLength(0);
    setGuesses([]);
    setCorrect(false);
    setPlaying(false);
    setKeys({});
    setHashList([]);
    setWordHash({});
  };
  const selectLength = () => {
    setWordArray();
    randomWord();
    filterWords();
    setLength(tmpLength);
    input.current.elements[0].focus();
  };
  const SquareGuesses = () => {
    let fullStr = [];
    for (let i = 0; i < guesses.length; ++i) {
      let currGuess = guesses[i];
      fullStr.push(
        <div id="square" key={i}>
          <div className="parent">
            {Array.from({ length: length }, (_, k) => (
              <div
                key={k}
                style={{ backgroundColor: hashList[i][k] }}
                className="inline-block-child"
                id={`inline-block-child${k}`}
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
  useEffect(() => {
    if (length > 0 && guesses.length === parseInt(length) + 1 && !correct) {
      continueModal.onOpen();
    }
  }, [correct, length, guesses]);

  return (
    <div className="body">
      {length > 2 ? (
        <div>
          {cnt > 0 ? (
            <div className="square-guesses">
              <SquareGuesses
                guesses={guesses}
                length={length}
                hashList={hashList}
              />
            </div>
          ) : (
            <div></div>
          )}

          {!correct ? (
            <div className="game-body">
              <div>{crossBoard}</div>
              {submitButton === true && debug === true ? (
                <div>
                  <button className="button" type="button" onClick={updateWord}>
                    Enter
                  </button>
                  <h3>Not a valid word! Try Again!</h3>
                </div>
              ) : (
                submitButton === true && (
                  <button className="button" type="button" onClick={updateWord}>
                    Enter
                  </button>
                )
              )}
              <div>
                <div className="keys">
                  <Keyboard keys={keys} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1>You Win! Play Again?</h1>
              <button className="button" onClick={playAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : playing === true ? (
        <div>
          <p className=" font-bold italic text-sm text-gray-500 font-mono">
            Select Lingle word length:{' '}
          </p>
          <form>
            <input
              autoFocus
              className="numbox"
              min={3}
              type="number"
              value={tmpLength}
              onChange={(res) => setTmpLength(res.target.value)}
            />
            <input
              className="button"
              type="submit"
              value="Submit"
              onClick={selectLength}
            />
          </form>
        </div>
      ) : (
        <div>
          <button className="button" onClick={play}>
            Play now
          </button>
        </div>
      )}
      <ContinueModal length={length} playAgain={playAgain} answer={answer} />
    </div>
  );
};

export default Game;
