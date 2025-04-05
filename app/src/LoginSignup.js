import React, { useState } from "react";
import './LoginSignup.css';



function sloppyHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // convert to 32bit int
    }
    return hash.toString();
  }
  
  function storePasskey(passkey) {
    const hashed = sloppyHash(passkey);
    localStorage.setItem('user_passkey', hashed);
  }
  
  function checkPasskey(input) {
    const storedHash = localStorage.getItem('user_passkey');
    if (!storedHash) return false;
    const inputHash = sloppyHash(input);
    return inputHash === storedHash;
  }
  
  function deleteAllUserData() {
    localStorage.clear();
  }



// Login Component
const Login = ({ setLoggedIn }) => {
    const [passkey, setPasskey] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
      const isValid = checkPasskey(passkey);
      if (isValid) {
        setLoggedIn(true); // User is authenticated
      } else {
        alert('Invalid passkey');
      }
    };
  
    return (
      <div className="form-container" style={{ margin: "20px 0", textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "200px", margin: "20px auto", display: "block" }}
        />
        <h1 style={{ margin: "20px 0" }}>RabbitHole.ai</h1>
        <h2 style={{ margin: "20px 0" }}>See how far the rabbit hole goes</h2>
        <form onSubmit={handleLogin} style={{ margin: "20px 0" }}>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
            style={{ display: "block", margin: "10px auto" }}
          />
          <button
            type="submit"
            className="submit-btn"
            style={{ display: "block", margin: "20px auto" }}
          >
            Enter passkey
          </button>
        </form>
      </div>
    );
  };
  
// Sign Up Componentconst SignUp = ({ setLoggedIn }) => {
    const SignUp = ({ setLoggedIn }) => {
        const [newPasskey, setNewPasskey] = useState('');
      
        const handleSignUp = (e) => {
          e.preventDefault();
          // Store the hashed passkey
          storePasskey(newPasskey);
          deleteAllUserData(); // Clear all user data
          setLoggedIn(true); // Simulate user login after resetting passkey
        };
      
        return (
          <div className="form-container" style={{ margin: "20px 0", textAlign: "center" }}>
            <img src="/reset.png" alt="Logo" style={{ width: "200px", margin: "20px auto", display: "block" }} />
            <h2 style={{ margin: "20px 0" }}>Reset Passkey</h2>
            <p style={{ margin: "10px 0", fontSize: "14px" }}>
              Your new passkey will be encrypted and saved on your device.  
              <span style={{ color: "red", fontSize: "12px" }}>
                Resetting will cause all old data to be deleted.
              </span>
            </p>
      
            <form onSubmit={handleSignUp} style={{ margin: "20px 0" }}>
              <input
                type="password"
                placeholder="Your new passkey"
                className="input-field"
                value={newPasskey}
                onChange={(e) => setNewPasskey(e.target.value)}
                required
                style={{ display: "block", margin: "10px auto" }}
              />
              <button
                type="submit"
                className="submit-btn"
                style={{ display: "block", margin: "20px auto" }}
              >
                Reset Code
              </button>
            </form>
          </div>
        );
      };
      

      const LoginSignUp = ({ setLoggedIn }) => {
        const [isSignUp, setIsSignUp] = useState(false);
      
        return (
          <div className="auth-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ textAlign: "center" }}>
              {isSignUp ? (
                <>
                  <SignUp setLoggedIn={setLoggedIn} />
                  <p style={{ marginTop: "20px" }}>
                    Remember your passkey?{" "}
                    <span
                      className="link-text"
                      style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setIsSignUp(false)}
                    >
                      Unlock
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <Login setLoggedIn={setLoggedIn} />
                  <p style={{ marginTop: "20px" }}>
                    First time using? Forgot passkey?{" "}
                    <span
                      className="link-text"
                      style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setIsSignUp(true)}
                    >
                      Reset Account
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        );
      };
      
export default LoginSignUp;
