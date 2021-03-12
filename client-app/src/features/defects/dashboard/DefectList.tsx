import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DefectListItem from './DefectListItem';

export default observer(function DefectList() {
    const { defectStore } = useStore();
    const { groupedDefects } = defectStore;

    return (
        <>
            {groupedDefects.map(([group, defects]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {defects.map(defect => (
                        <DefectListItem key={defect.id} defect={defect} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})