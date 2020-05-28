import React, { useState } from 'react';
import './App.css';
import SleepInfo from './SleepInfo'
import Auth from './Auth'

function App() {

  const[uid, setUid] = useState("");

  return (
    <div className="App">
      <h1>Sleep...</h1>
      <Auth callback={setUid}>
        <SleepInfo uid={uid} />
      </Auth>
    </div>
  );
}

export default App;

