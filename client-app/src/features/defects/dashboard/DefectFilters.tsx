import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function DefectFilters() 
{
    const {defectStore: {predicate, setPredicate}} = useStore();
    const [visibility, setVisibility] = useState(false);
    return (
        <>
            <Menu horizontal="true" stackable size='large' className="justify-content-center">
                <Header icon='filter' attached color='red' content='Filters' />
                <Menu.Item 
                    content='Open Defects'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content='Closed Defects'
                    active={predicate.has('isClosed')}
                    onClick={() => setPredicate('isClosed', 'true')}
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
                <Menu.Item
                    content="By Date" 
                    active={visibility}
                    onClick={() => setVisibility(!visibility)}
                />
            </Menu>
            <Header />
            {visibility ? (
                <Calendar 
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || null}
            />
            ) : (<></>)}
        </>

    )
})