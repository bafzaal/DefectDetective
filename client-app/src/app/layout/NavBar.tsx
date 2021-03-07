import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar()
{
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo2.png" alt="logo" style={{marginRight: '10px'}}/>
                    Defect Detective
                </Menu.Item>
                <Menu.Item name='Defects' />
                <Menu.Item>
                    <Button positive content='Create Defect' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}