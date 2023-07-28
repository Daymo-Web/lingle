import React, { useState } from 'react';
import Modal from 'react-modal';
import { useContinueModal } from '../hooks/useContinueModal';

const ContinueModal = ({ length, playAgain, answer }) => {
  let subtitle;
  const continueModal = useContinueModal();
  const [showAnswer, setShowAnswer] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      //   right: 'auto',
      //   bottom: '',
      backgroundColor: '#ffadad',
      marginRight: '-50%',
      minHeight: '80%',
      transform: 'translate(-50%, -50%)',
    },
    button: {
      backgroundColor: '#ffadad',
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#ae2012';
  }

  const continueGame = () => {
    continueModal.onClose();
    setShowAnswer(false);
  };

  const resetGame = () => {
    playAgain();
    continueModal.onClose();
    setShowAnswer(false);
  };

  return (
    <div>
      <Modal
        isOpen={continueModal.isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={continueModal.onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-wrapper">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You just lost</h2>

          <div className="modal-explanation-wrapper">
            <p className="modal-explanation">
              Because the word is {length} letters long, you have{' '}
              {parseInt(length) + 1} guesses to get the word right.
            </p>
          </div>
          <div>
            <button className="modal-button" onClick={continueGame}>
              Keep Going
            </button>
            <button onClick={resetGame} className="modal-button text-sm">
              Reset Game
            </button>
          </div>
          <button
            className="modal-display-answer rounded-full"
            onClick={() => setShowAnswer(true)}
          >
            See the answer
          </button>
          {showAnswer && (
            <div className="modal-answer">
              <p className="modal-answer-text">{answer}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ContinueModal;
