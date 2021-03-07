import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IDefect } from '../../../app/models/defect';
import DefectList from './DefectList';

interface IProps
{
    defects: IDefect[];
}

export default function DefectDashboard({defects}: IProps)
{
    return(
        <Grid>
            <Grid.Column width='10'>
            <DefectList defects={defects} />             
            </Grid.Column>
        </Grid>
    )
}