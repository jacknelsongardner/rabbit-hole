import React, { useState } from "react";
import './LoginSignup.css';

// Login Component
const Login = ({ setLoggedIn }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    setLoggedIn(true); // Example action on login
  };

return (
    <div className="form-container" style={{ margin: "20px 0", textAlign: "center" }}>
        <h2 style={{ margin: "20px 0" }}>Login</h2>
        <form onSubmit={handleLogin} style={{ margin: "20px 0" }}>
            
            <input
                type="password"
                placeholder="Password"
                className="input-field"
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
// Sign Up Component
const SignUp = ({ setLoggedIn }) => {
    
    
    const [selectedPoints, setSelectedPoints] = useState([]);

    const handleSignUp = (e) => {
        e.preventDefault();
        // Implement sign up logic here
        setLoggedIn(true); // Example action on sign-up
    };

    const handleCheckboxChange = (point) => {
        setSelectedPoints((prevPoints) =>
            prevPoints.includes(point)
                ? prevPoints.filter((item) => item !== point)
                : [...prevPoints, point]
        );
    };

    return (
        <div className="form-container" style={{ margin: "20px 0", textAlign: "center" }}>
            <h2 style={{ margin: "20px 0" }}>Sign Up</h2>
            <form onSubmit={handleSignUp} style={{ margin: "20px 0" }}>
                
                <input
                    type="password"
                    placeholder="Your new passkey"
                    className="input-field"
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

// LoginSignUp Component to handle toggling between login and sign up
const LoginSignUp = ({ setLoggedIn }) => { // Destructure setLoggedIn from props
    const [isSignUp, setIsSignUp] = useState(false);

    

    return (
        <div className="auth-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ textAlign: "center" }}>
                {isSignUp ? (
                    <>
                        <SignUp setLoggedIn={setLoggedIn} />
                        <p style={{ marginTop: "20px" }}>
                            Already a member?{" "}
                            <span
                                className="link-text"
                                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                onClick={() => setIsSignUp(false)}
                            >
                                Log In
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <Login setLoggedIn={setLoggedIn} />
                        <p style={{ marginTop: "20px" }}>
                            Not signed up?{" "}
                            <span
                                className="link-text"
                                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign Up
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
