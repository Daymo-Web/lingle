import React from 'react';
import Modal from 'react-modal';
import { useInfoModal } from '../hooks/useInfoModal';

const InfoModal = ({ isOpen, setIsOpen }) => {
  let subtitle;
  const infoModal = useInfoModal();
  console.log(infoModal);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      // right: "auto",
      // bottom: "",
      backgroundColor: '#ffadad',
      marginRight: '-50%',
      minHeight: '80%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#ae2012';
  }

  function closeModal() {
    infoModal.onClose();
  }

  return (
    <div>
      <Modal
        isOpen={infoModal.isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={infoModal.onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>What is Lingle?</h2>

        <div>
          <p>
            Lingle is an adaptation to a popular NY times game called Wordle.{' '}
            <a href="https://www.nytimes.com/games/wordle/index.html">
              Click here to check out the orignal Wordle Game.
            </a>
          </p>
          <p>
            The rules to Worldle are simple. Just guess a word. Any word with
            five letters. Hints will appear after each word guess, showing
            whether letters are in the right spot, in the word but in the wrong
            spot, or not in the word at all. Using these hints, make another
            guess and repeat until you’ve got the word — or don’t get the word,
            and lose.
          </p>
          <p>
            If the color of the hint is <span className="green">green</span>,
            the letter is in the word and in the correct spot.
          </p>
          <p>
            If the color of the hint is <span className="yellow">yellow</span>,
            the letter is in the word but is in the wrong spot.
          </p>
          <p>
            If the color of the hint is <span className="grey">grey</span>, the
            letter is not in the word and should be discarded.
          </p>
          <p>
            We extended gameplay functionalities in Lingle from Wordle. In
            wordle, users get 6 tries to guess the word; we allowed unlimited
            tries for users to guess the word. We allowed users to choose what
            letter words they want to play with, rather than the default five
            ltter words from Wordle. We also implemented a Play Again function,
            where Wordle only lets you play their game once a day.
          </p>
          <p1>Creators: David Ha 🤪 & Jamison Homatas 🙂</p1>
        </div>
        <button onClick={closeModal} className="modal-button">
          close
        </button>
      </Modal>
    </div>
  );
};

export default InfoModal;
