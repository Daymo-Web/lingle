import './App.css';
// import { Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

import Game from './components/Game';
import Navbar from './components/Navbar';
import InfoModal from './components/InfoModal';
import TypewriterComponent from 'typewriter-effect';

function App() {
  // var markup = document.documentElement.innerHTML;

  return (
    <div className="flex flex-col items-center h-screen App">
      <div className="">
        <Navbar />
        {/* <style>{'html {background-color:' + setbgcolor + ';}'}</style> */}
        <div>
          <TypewriterComponent
            options={{
              strings: ['Lingle', 'by David Ha & Jamison Homatas'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
<<<<<<< HEAD
      <Game />
      <InfoModal />
=======
      <div className="body">
        {length > 2 ? (
          <div>
            {cnt > 0 ? (
              <div className="square-guesses">
                <SquareGuesses />
              </div>
            ) : (
              <div></div>
            )}

            {!correct ? (
              <div className="game-body">
                <div>{crossBoard}</div>
                {submitButton === true && debug === true ? (
                  <div>
                    <button
                      className="button"
                      type="button"
                      onClick={updateWord}
                    >
                      Enter
                    </button>
                    <h3>Not a valid word! Try Again!</h3>
                  </div>
                ) : submitButton === true ? (
                  <button className="button" type="button" onClick={updateWord}>
                    Enter
                  </button>
                ) : (
                  <div></div>
                )}
                <div>
                  <div className="keys">
                    <KeyboardRender />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>You Win! Play Again?</h1>
                <button className="button" onClick={PlayAgain}>
                  Play Again
                </button>
              </div>
            )}
          </div>
        ) : playing === true ? (
          <div>
            <h2>Select Lingle word length: </h2>
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

            <button className="button" onClick={openModal}>
              Info
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                What is Lingle?
              </h2>

              <div>
                <p>
                  Lingle is an adaptation to a popular NY times game called
                  Wordle.{" "}
                  <a href="https://www.nytimes.com/games/wordle/index.html">
                    Click here to check out the original Wordle Game.
                  </a>
                </p>
                <p>
                  The rules to Worldle are simple. Just guess a word. Any word
                  with five letters. Hints will appear after each word guess,
                  showing whether letters are in the right spot, in the word but
                  in the wrong spot, or not in the word at all. Using these
                  hints, make another guess and repeat until you’ve got the word
                  — or don’t get the word, and lose.
                </p>
                <p>
                  If the color of the hint is{" "}
                  <span className="green">green</span>, the letter is in the
                  word and in the correct spot.
                </p>
                <p>
                  If the color of the hint is{" "}
                  <span className="yellow">yellow</span>, the letter is in the
                  word but is in the wrong spot.
                </p>
                <p>
                  If the color of the hint is <span className="grey">grey</span>
                  , the letter is not in the word and should be discarded.
                </p>
                <p>
                  We extended gameplay functionalities in Lingle from Wordle. In
                  wordle, users get 6 tries to guess the word; we allowed
                  unlimited tries for users to guess the word. We allowed users
                  to choose what letter words they want to play with, rather
                  than the default five ltter words from Wordle. We also
                  implemented a Play Again function, where Wordle only lets you
                  play their game once a day.
                </p>
                <p1>Creators: David Ha 🤪 & Jamison Homatas 🙂</p1>
              </div>
              <button onClick={closeModal}>close</button>
            </Modal>
            <div>
              {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                  <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
              </Modal> */}
            </div>
          </div>
        )}
      </div>

      <Modal show={show}></Modal>
>>>>>>> 49f842f9a1965c17ede8bd5a6de61cadb78bf3ac
    </div>
  );
}

export default App;
