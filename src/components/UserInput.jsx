import React, { useState } from "react";
import "./UserInput.css";
import { useHistory } from "react-router-dom";

export default function UserInput({ onLogin }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@0-9][^\s@]*\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 3;
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(
      validateEmail(value) ? "" : "Please enter a valid email address"
    );
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      value.length < 3 ? "Password must be at least 3 character long" : ""
    );
  }

  function isFormValid() {
    return validateEmail(email) && validatePassword(password);
  }

  async function handleSubmit(e) {
    console.log("adgagag");
    e.preventDefault();
    if (isFormValid()) {
      setIsLoading(true); // spiner true- when request starts
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        setIsLoading(false); // spiner - false, when response is recived

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
          setPopupVisible(true);
          return;
        }

        const data = await response.json();
        console.log("Login successful with token: ", data.token);
        // ovo izbacujemo, posto vise ne pozivamo tu funkciju u App.js
        // onLogin(email);
        // ova linija ispod je dodatak da bi dispatchovao neki evenet, u ovom slucaju hocemo da znamo da nam se user email update-vao da bi mogli promenuti u komponenti Header tekst sa login na logout i dodati email
        window.dispatchEvent(new Event("userUpdate"));
        // local storage dodajemo da bi imali negde u sacuvan user email....kasnije kad krenes da radis posle logina obicno ubacuje u neki state management (Redux, ContextAPI itd)
        localStorage.setItem("userEmail", email);
        // local storage ces koristiti bas cesto, to ti je skladistenje u memoriju kompa/browsera/telefona
        // i onda ovamo redirektujemo usera na stranicu sa novinama
        history.push("/all");
      } catch (error) {
        console.error(error);
        setIsLoading(false); // spiner - false, on error
        setErrorMessage("An error occurred. Please try again.");
        setPopupVisible(true);
      }
    }
  }

  function dismissPopup() {
    setPopupVisible(false);
    setErrorMessage("");
  }

  return (
    <section>
      {isPopupVisible && (
        <div className="popup">
          <p>{errorMessage}</p>
          <button onClick={dismissPopup}>X</button>
        </div>
      )}
      <div className="input-container">
        <form className="input-form" onSubmit={handleSubmit}>
          {isLoading && <div className="loading-spinner"></div>}
          <h2>Login</h2>
          <p>
            <label>Your email address *</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            ></input>
            {emailError && <span className="span-error">{emailError}</span>}
          </p>
          <p>
            <label>Your password *</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            ></input>
            {passwordError && (
              <span className="span-error">{passwordError}</span>
            )}
          </p>
          <div className="btn-container">
            <button type="submit" disabled={!isFormValid()}>
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
