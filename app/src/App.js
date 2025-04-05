import React, { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import MainApp from './MainApp'; // Assuming MainApp is in the same folder
import LoginSignup from './LoginSignup'; // Assuming LoginSignup is in the same folder

function App() {
  const [logged, setLoggedIn] = useState(false); // Use useState to manage page state

  return (
    <CookiesProvider>
      <div>
        {logged === true ? (
          <MainApp setLoggedIn={setLoggedIn} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoginSignup setLoggedIn={setLoggedIn} />
          </div>
        )}
      </div>
    </CookiesProvider>
  );
}

export default App;
