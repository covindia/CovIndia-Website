import React from "react";
import "./App.css";
import WorldStats from "./components/WorldStats";
import WorldTable from "./pages/WorldTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WorldStats />
        <WorldTable />
      </header>
    </div>
  );
}

export default App;
