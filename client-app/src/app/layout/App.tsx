import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IDefect } from '../models/defect';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/Agent';

function App() {
  const [defects, setDefects] = useState<IDefect[]>([])
  const [selectedDefect, setSelectedDefect] = useState<IDefect | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Defects.list().then(response => {
      let defects: IDefect[] = [];
      response.forEach(defect => {
        defect.date = defect.date.split('T')[0];
        defects.push(defect);
      })
      setDefects(defects);
    })
  }, [])

  function handleSelectDefect(id: String)
  {
    setSelectedDefect(defects.find(x => x.id === id));
  }

  function handleCancelSelectDefect()
  {
    setSelectedDefect(undefined);
  }

  function handleFormOpen(id?: String)
  {
    id ? handleSelectDefect(id) : handleCancelSelectDefect();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleCreateOrEditDefect(defect: IDefect)
  {
    defect.id 
      ? setDefects([...defects.filter(x => x.id !== defect.id), defect]) 
      : setDefects([...defects, {...defect, id: uuid()}]);
    setEditMode(false);
    setSelectedDefect(defect);
  }

  function handleDeleteDefect(id: string)
  {
    setDefects([...defects.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <DefectDashboard 
          defects = {defects} 
          selectedDefect = {selectedDefect}
          selectDefect = {handleSelectDefect}
          cancelSelectDefect = {handleCancelSelectDefect}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditDefect}
          deleteDefect = {handleDeleteDefect}
        />
      </Container>
    </Fragment>
  );
}

export default App;
