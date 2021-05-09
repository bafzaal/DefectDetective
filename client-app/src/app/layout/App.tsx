import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DefectForm from '../../features/defects/form/DefectForm';
import DefectDetails from '../../features/defects/details/DefectDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App...' />

  return (
    <div className="page-container">
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <div className="content-wrap">
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <PrivateRoute exact path='/defects' component={DefectDashboard} />
                  <PrivateRoute path='/defects/:id' component={DefectDetails} />
                  <PrivateRoute key={location.key} path={['/createDefect', '/manage/:id']} component={DefectForm} />
                  <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                  <PrivateRoute path='/errors' component={TestErrors} />
                  <Route path='/server-error' component={ServerError} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      </div>
      <footer>
        <div className="text-center footer-text">Bilal Afzaal <span>&#169;</span> 2021</div>
      </footer>
    </div>
  );
}

export default observer(App);