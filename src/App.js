import React, { Component } from 'react';
import NoteBlock from './components/NoteBlock';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NoteBlock noteCode="w" />
        <NoteBlock noteCode="h" />
        <NoteBlock noteCode="q" />
        <NoteBlock noteCode="ee" />
        <NoteBlock noteCode="qr" />
      </div>
    );
  }
}

export default App;
