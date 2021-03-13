import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DefectForm from '../../features/defects/form/DefectForm';
import DefectDetails from '../../features/defects/details/DefectDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/defects' component={DefectDashboard} />
              <Route path='/defects/:id' component={DefectDetails} />
              <Route key={location.key} path={['/createDefect', '/manage/:id']} component={DefectForm} />
              <Route path='/errors' component={TestErrors} />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App);