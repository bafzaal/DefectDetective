import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { IDefect } from '../models/defect';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';

function App() {
  const [defects, setDefects] = useState<IDefect[]>([])

  useEffect(() => {
    axios.get<IDefect[]>('http://localhost:5000/api/defects').then(response => {
      setDefects(response.data);
    })
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <DefectDashboard defects={defects} />
      </Container>
    </Fragment>
  );
}

export default App;
