import React, { useEffect, useState } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const updateUserEmail = () => {
      const userEmail = localStorage.getItem("userEmail");
      setEmail(userEmail);
    };

    // Slušanje događaja `userUpdate` da bi znali kad se iz neke druge komponente nesto promeni
    window.addEventListener("userUpdate", updateUserEmail);

    // Uklanjanje listener-a kada se komponenta demontira
    return () => {
      window.removeEventListener("userUpdate", updateUserEmail);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Brisanje email-a iz Local Storage
    window.dispatchEvent(new Event("userUpdate")); // Emituje događaj
    history.push("/"); // Redirektujemo na login stranicu
  };

  const handleLogin = () => {
    history.push("/");
  };

  return (
    <header className="App-header">
      <h2 className="header-title">News</h2>
      <div className="header-right">
        {email ? (
          <div className="user-info">
            <span>{email}</span>
            <span className="interspace"> | </span>
            <button className="btnLogin-Logout" onClick={handleLogout}>
              logout
            </button>
          </div>
        ) : (
          <div className="login-button">
            <button className="btnLogin-Logout" onClick={handleLogin}>
              login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
