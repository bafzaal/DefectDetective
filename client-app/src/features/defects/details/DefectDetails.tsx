import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DefectDetailedChat from './DefectDetailedChat';
import DefectDetailedHeader from './DefectDetailedHeader';
import DefectDetailedInfo from './DefectDetailedInfo';
import DefectDetailedSidebar from './DefectDetailedSidebar';

export default observer(function DefectDetails()
{

    const {defectStore} = useStore();
    const {selectedDefect: defect, loadDefect, loadingInitial, clearSelectedDefect} = defectStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadDefect(id);
        return () => clearSelectedDefect();
    }, [id, loadDefect, clearSelectedDefect]);

    if(loadingInitial || !defect) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={10}>
                <DefectDetailedHeader defect={defect} />
                <DefectDetailedInfo defect={defect} />
                <DefectDetailedChat defectId={defect.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <DefectDetailedSidebar defect={defect} />
            </Grid.Column>
        </Grid>
    )
})