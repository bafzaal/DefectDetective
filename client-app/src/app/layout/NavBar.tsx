import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar()
{
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo2.png" alt="logo" style={{marginRight: '10px'}}/>
                    Defect Detective
                </Menu.Item>
                <Menu.Item as={NavLink} to='/defects' name='Defects' />
                <Menu.Item>
                    <Button as={NavLink} to='/createDefect' positive content='Create Defect' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}