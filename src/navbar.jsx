import React from 'react';
import { Auth } from 'aws-amplify';
import { Greetings, NavBar, Nav, NavRight } from 'aws-amplify-react';

export default class MyNavbar extends Greetings {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser } = this.props;
        const signedIn = !!currentUser;

        // const theme = this.props.theme;
        const greeting = signedIn ? currentUser : "Signed Out";
        if (!greeting) return null;
        
        return (
            <NavBar>
                <Nav>
                    {greeting}
                    <NavRight>
                        <button onClick={() => Auth.signOut()}>Log Out</button>
                    </NavRight>
                </Nav>
            </NavBar>
        );
    }
}