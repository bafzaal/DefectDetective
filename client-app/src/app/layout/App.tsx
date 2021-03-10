import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DefectForm from '../../features/defects/form/DefectForm';
import DefectDetails from '../../features/defects/details/DefectDetails';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/defects' component={DefectDashboard} />
        <Route path='/defects/:id' component={DefectDetails} />
        <Route path='/createDefect' component={DefectForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);