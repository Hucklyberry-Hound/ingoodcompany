import React from "react";
import "../styles/App.css";
import Routes from "./routes";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
