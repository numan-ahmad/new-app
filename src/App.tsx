import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoComplete } from './Autocomplete';
import data from './data.json'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Autocomplete Field</h1>
        <AutoComplete
          inputStyle={{ backgroundColor: "#f1f1f1" }}
          data={data} />
      </header>
    </div>
  );
}

export default App;
