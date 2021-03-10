import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import DefectDashboard from '../../features/defects/dashboard/DefectDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {defectStore} = useStore();

  useEffect(() => {
    defectStore.loadDefects();
  }, [defectStore])

  if(defectStore.loadingInitial)
  {
    return <LoadingComponent content="Loading App" />
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <DefectDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);