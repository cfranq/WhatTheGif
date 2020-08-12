import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import Splash from './Splash';
import MainGame from './MainGame';
import EndGame from './EndGame';
import PlayerContext from '../context/PlayerContext';

const App = () => {
  const [player, setPlayer] = useState({ name: '', index: undefined });
  const [gameOn, setGameOn] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState('');
 //const [isSignedIn, setisSignedIn] = useState(false);

  const socket = useContext(SocketContext);

  // socket.on('signIn', (userCredentials) => {
  //   setisSignedIn(true);
  // });

  socket.on('startGame', () => {
    setGameOn(true);
  });

  socket.on('updateUser', (playerInfo) => {
    setPlayer({ ...playerInfo });
  });
  //socket.emit('updateUser', { name: player.name, index: players.length - 1 });
  socket.on('endGame', (winner) => {
    setWinner(winner);
    setGameOn(false);
    setGameEnd(true);
  });

  //initializeGoogleSignIn() {
    // window.GamepadHapticActuator.load('auth2', () => {
    //   window.GamepadHapticActuator.auth2.init({
    //     client_id:
    //     "248537884063-ababaq1mckqquih1ib5vi0d0nqs07up4.apps.googleusercontent.com"
    //   }).then(() => {
    //     const isSignedIn = window.gapi.auth2.
    //     getAuthInstance().isSignedIn.get()
    //     {setisSignedIn}
    //   })
    // })
  //};
  // compnentDidMount() {
  //   const script = document.createElement('script')
  //   script.src = "https://apis.google.com/js/platfrom.js"
  //   script.onload = () => this.initalizeGoogleSignIn()
  //   document.body.appendChild(script)
  // };

  let currentView;
  //if(isSignedIn) {
  // currentView = 
      // (
      //   <div>
            //< LoginPage setisSignIn={isSignedIn} />
            //< MainGame />
      //   </div>
      // )
  // }
  if (gameOn) {
    currentView = 
    (<div>
      <img alt="logo" src="https://fontmeme.com/permalink/200812/494bb6ee41bd84762de732c77da6bd2f.png" height='100px' />
      <MainGame />
      </div>);
  } else if (gameEnd) {
    currentView = <EndGame winner={winner} />;
  } else {
    currentView = <Splash />;
  }

  return (
    <PlayerContext.Provider value={player}>
      <div>{currentView}</div>
    </PlayerContext.Provider>
  );
};

export default App;
