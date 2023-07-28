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
      <Game />
      <InfoModal />
    </div>
  );
}

export default App;
