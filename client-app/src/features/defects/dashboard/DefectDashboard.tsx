import React from 'react';
import { Grid } from 'semantic-ui-react';
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
    createOrEdit: (defect: IDefect) => void;
    deleteDefect: (id: string) => void; 
    submitting: boolean;
}

export default function DefectDashboard({defects, selectedDefect, selectDefect, deleteDefect,
     cancelSelectDefect, editMode, openForm, closeForm, createOrEdit, submitting}: IProps)
{
    return(
        <Grid>
            <Grid.Column width='10'>
            <DefectList defects={defects} 
                selectDefect={selectDefect} 
                deleteDefect={deleteDefect}
            />             
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDefect && !editMode &&
                <DefectDetails 
                    defect={selectedDefect} 
                    cancelSelectDefect={cancelSelectDefect} 
                    openForm={openForm}
                />}
                {editMode && 
                <DefectForm 
                    closeForm={closeForm} 
                    defect={selectedDefect} 
                    createOrEdit={createOrEdit} 
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}