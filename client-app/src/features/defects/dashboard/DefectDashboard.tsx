import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import DefectDetails from '../details/DefectDetails';
import DefectForm from '../form/DefectForm';
import DefectList from './DefectList';

interface IProps
{
    defects: IDefect[];
    selectedDefect: IDefect | undefined;
    selectDefect: (id: String) => void;
    cancelSelectDefect: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function DefectDashboard({defects, selectedDefect, selectDefect,
     cancelSelectDefect, editMode, openForm, closeForm}: IProps)
{
    return(
        <Grid>
            <Grid.Column width='10'>
            <DefectList defects={defects} selectDefect={selectDefect} />             
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDefect && !editMode &&
                <DefectDetails 
                    defect={selectedDefect} 
                    cancelSelectDefect={cancelSelectDefect} 
                    openForm={openForm}
                />}
                {editMode && 
                <DefectForm closeForm={closeForm} defect={selectedDefect} />}
            </Grid.Column>
        </Grid>
    )
}