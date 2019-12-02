import React from 'react';
import { Auth } from 'aws-amplify';
import { Greetings, NavBar, Nav, NavRight } from 'aws-amplify-react';
import { CLASS_COLORS } from './dndb-tables';

export default class MyNavbar extends Greetings {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuOpen: this.state.menuOpen ? false : true });
    }

    saveButton() {
        if (this.props.currentChar) {
            const disable = this.props.currentChar.name === "";
            console.log(disable);
            return (
                <li style={{cursor: disable ? 'normal' : 'pointer', color: disable ? 'gray' : 'black'}}
                    onClick={disable ? "" : this.props.saveChar}
                >
                    {disable ? "Name your character to save" : "Save Character"}
                </li>
            )
        }
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
                        <img id="navbar-menu-button"
                            src="https://img.icons8.com/ios-filled/50/000000/menu.png"
                            onClick={this.toggleMenu}
                        >
                        </img>
                        <div className={`navbar-menu${this.state.menuOpen ? "" : " hidden"}`}>
                            <ul>
                                <li style={{cursor: 'pointer'}} onClick={this.props.randomChar}>
                                    New Random Character
                                </li>
                                <br/>
                                {this.saveButton()}
                                <br/>
                                <div><strong>Load Character</strong></div>
                                {this.props.charsList.map(char => {
                                    return (
                                        <li key={char.name}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => this.props.loadChar(char)}
                                        >
                                            <div>{char.name}</div>
                                            <div>Level {char.level}</div>
                                            <div style={{ color: CLASS_COLORS[char.cClass] }}>{char.cClass}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
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