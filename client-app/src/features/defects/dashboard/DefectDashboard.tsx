import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DefectDetails from '../details/DefectDetails';
import DefectForm from '../form/DefectForm';
import DefectList from './DefectList';

export default observer(function DefectDashboard()
{

    const {defectStore} = useStore();
    const {selectedDefect, editMode} = defectStore;

    return(
        <Grid>
            <Grid.Column width='10'>
            <DefectList />             
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDefect && !editMode &&
                <DefectDetails />}
                {editMode && 
                <DefectForm />}
            </Grid.Column>
        </Grid>
    )
})