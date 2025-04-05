import React, { useState } from 'react';
import MainApp from './MainApp'; // Assuming MainApp is in the same folder
import LoginSignup from './LoginSignup'; // Assuming LoginSignup is in the same folder

function App() {
  const [logged, setLoggedIn] = useState(false); // Use useState to manage page state

  const clearAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
      <div>
        {logged === true ? (
          <MainApp setLoggedIn={setLoggedIn} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoginSignup setLoggedIn={setLoggedIn} setResetCode={clearAllData}/>
          </div>
        )}
      </div>
  );
}

export default App;
