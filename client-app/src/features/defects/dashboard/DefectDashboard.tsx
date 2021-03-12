import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DefectFilters from './DefectFilters';
import DefectList from './DefectList';

export default observer(function DefectDashboard()
{
    const {defectStore} = useStore();
    const {loadDefects, defectRegistry} = defectStore;

    useEffect(() => {
        if(defectRegistry.size <= 1) loadDefects();
    }, [defectRegistry.size, loadDefects])

    if(defectStore.loadingInitial)
    {
        return <LoadingComponent content="Loading App" />
    }

    return(
        <Grid>
            <Grid.Column width='10'>
            <DefectList />             
            </Grid.Column>
            <Grid.Column width='6'>
                <DefectFilters />
            </Grid.Column>
        </Grid>
    )
})