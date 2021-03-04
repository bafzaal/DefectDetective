import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [defects, setDefects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/defects').then(response => {
      console.log(response);
      setDefects(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {defects.map((defect: any) => (
            <li key={defect.id}>
              {defect.title}
            </li>
          ))}
        </ul>       
      </header>
    </div>
  );
}

export default App;
