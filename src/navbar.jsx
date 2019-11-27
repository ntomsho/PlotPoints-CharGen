import React from 'react';
import { Auth } from 'aws-amplify';
import { Greetings, NavBar, Nav, NavRight } from 'aws-amplify-react';

export default class MyNavbar extends Greetings {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    toggleMenu() {

    }

    render() {
        const { currentUser } = this.props;
        const signedIn = !!currentUser;
        
        const greeting = signedIn ? currentUser : "Signed Out";
        if (!greeting) return null;
        
        return (
            <NavBar>
                <Nav>
                    <div style={{position: 'relative'}}>
                        <img id="navbar-menu"
                            src="https://img.icons8.com/ios-filled/50/000000/menu.png"
                            onClick={this.toggleMenu}
                        >
                        </img>
                        
                    </div>
                    <NavRight>
                        {greeting}
                        <button onClick={() => Auth.signOut()}>Log Out</button>
                    </NavRight>
                </Nav>
            </NavBar>
        );
    }
}