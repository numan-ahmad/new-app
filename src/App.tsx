import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoComplete } from './Autocomplete';
import data from './data.json'

function App() {
  return (
    <div className="App">
      <AutoComplete
        inputStyle={{ backgroundColor: "PaleTurquoise" }}
        optionsStyle={{ backgroundColor: "LemonChiffon" }}
        data={data}
        iconColor="Turquoise" />
    </div>
  );
}

export default App;
