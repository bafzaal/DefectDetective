import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import Navbar from "../../app/layout/NavBar";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <>
            <Navbar />
            <div id="landing">
                <div id="landingText" className="ui text-center">
                    <Header as='h1' className="headerText text-center" inverted>
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
        </>
    )
})