import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [defects, setDefects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/defects').then(response => {
      console.log(response);
      setDefects(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Defect Detective' />
      <List>
        {defects.map((defect: any) => (
              <List.Item key={defect.id}>
                {defect.title}
              </List.Item>
            ))}
      </List>
    </div>
  );
}

export default App;
