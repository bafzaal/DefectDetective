import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function DefectFilters() 
{
    const {defectStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Defects'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="I'm Working on" 
                    active={predicate.has('isWorking')}
                    onClick={() => setPredicate('isWorking', 'true')}
                />
                <Menu.Item
                    content="I've Created" 
                    active={predicate.has('isOwner')}
                    onClick={() => setPredicate('isOwner', 'true')}
                />
            </Menu>
            <Header />
            <Calendar 
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>

    )
})