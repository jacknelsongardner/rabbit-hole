import logo from './logo.svg';
import './App.css';

import LoginSignup from './LoginSignup.js';
import MainApp from './MainApp.js';

import React, { useState } from 'react';


function App() {
  const [logged, setLoggedIn] = useState(false); // Use useState to manage page state

  return (
    <div>
      {logged === true ? (
        <MainApp setLoggedIn={setLoggedIn} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoginSignup setLoggedIn={setLoggedIn} />
        </div>
      )}
    </div>
  );
}

export default App;