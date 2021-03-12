import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function DefectFilters() 
{
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Defects' />
                <Menu.Item content="I'm Working on" />
                <Menu.Item content="I've Created" />
            </Menu>
            <Header />
            <Calendar />
        </>

    )
}