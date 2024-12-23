import React from "react";
import "./Header.css";

export default function Header({ userEmailPropt, onLogoutPropt }) {
  return (
    <header className="App-header">
      <h2 className="header-title">News</h2>
      <div className="header-right">
        {userEmailPropt ? (
          <div className="user-info">
            <span>{userEmailPropt}</span>
            <span className="interspace"> | </span>
            <button className="btnLogin-Logout" onClick={onLogoutPropt}>
              logout
            </button>
          </div>
        ) : (
          <div className="login-button">
            <button className="btnLogin-Logout">login</button>
          </div>
        )}
      </div>
    </header>
  );
}
