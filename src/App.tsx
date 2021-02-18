import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Auth userId={""} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </div>
  );
}

export default App;
