import { useState } from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {

  const [winner, setWinner] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <Grid winner={winner} setWinner={setWinner}/>
      {
        Boolean(winner) && <h2>El Ganador es: {winner}</h2>
      }
      </header>
    </div>
  );
}

export default App;
