import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <div id="landing">
            <div className="ui secondary stackable menu" id="menu">
                <div className="item">
                <Image size='mini' src='/assets/logo_red.png' alt='logo' />
                </div>
                <div className="right menu">
                    <div className="item header"><a className="linkNav" href="/">Home</a></div>
                    <div className="item header"><a className="linkNav" href="#">About</a></div>
                    <div className="item">
                        <button className="ui huge red button">Create Defect</button>
                    </div>
                </div>
            </div>
            <div className="ui text container">
                <br />
                <br />
                <br />
                <br />
                <br />
                <Header as='h1' className="headerText" inverted>
                    Defect Detective
                </Header>
                <Header as='h3' id="subHeaderText" inverted>
                    Collaborate with your team and work together to resolve defects.
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/defects' size='large' className="red">
                            Go to Defects!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='large' className="red">
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='large' className="white" inverted>
                            Register
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
})