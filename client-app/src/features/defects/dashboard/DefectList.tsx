import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DefectListItem from './DefectListItem';

export default observer(function DefectList()
{
    const {defectStore} = useStore();
    const {defectsByDate} = defectStore;

    return(
        <Segment>
            <Item.Group divided>
                {defectsByDate.map(defect => (
                    <DefectListItem key={defect.id} defect={defect} />
                ))}
            </Item.Group>
        </Segment>
    )
})