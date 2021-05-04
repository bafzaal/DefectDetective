import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RButton from 'react-bootstrap/Button';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    const { userStore } = useStore();
    return (
        <Navbar id="navigationBar" collapseOnSelect expand="lg" variant="dark" className="navBar">
            <Navbar.Brand id="navImage" href="/"><Image size='mini' src='/assets/logo_red.png' alt='logo' /></Navbar.Brand>
            <div className="item header"><Nav.Link href="/" className="linkNav">Defect Detective</Nav.Link></div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="text-center" style={{ flex: 1 }}>
                    <div className="item header"><Nav.Link href="/" className="linkNav">Home</Nav.Link></div>
                    <div className="item header"><Nav.Link href="#About" className="linkNav">About</Nav.Link></div>
                    {userStore.isLoggedIn ? (
                        <div className="item header"><Nav.Link href="/Defects" className="linkNav">Dashboard</Nav.Link></div>
                    ) : (<></>)}
                </Nav>
                {userStore.isLoggedIn ? (
                    <>
                        <Nav className="text-center">
                            <RButton className="text-center" size="sm" variant="outline-danger" as={NavLink} to='/createDefect'>Create Defect</RButton>
                        </Nav>
                        <Nav className="text-center clearfix">
                            <NavDropdown
                                title={
                                    <div className="pull-left userProfile">
                                        <img id="userNavImage"
                                            src={user?.image || '/assets/user.png'}
                                            alt="user pic"
                                            width="35"
                                            height="35"
                                        />

                                        <h4 id="userNavName" className="text-center">{user?.displayName}</h4>
                                    </div>
                                }
                                id="basic-nav-dropdown">

                                <NavDropdown.Item as={Link} to={`/profiles/${user?.username}`}>My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </>
                ) : (<></>)}
            </Navbar.Collapse>
        </Navbar>
    )
})