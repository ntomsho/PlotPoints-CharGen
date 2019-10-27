import React from 'react';
import BackendWrapper from './backend_wrapper';
import Amplify, { Storage, API, Auth } from 'aws-amplify';
import { CLASSES, SKILLS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';
import CharSelect from './char_select';
import Skills from './skills';
import ClassMain from './class_main';
import Inventory from './inventory';
import Advancement from './advancement';
import { ConsoleLogger } from '@aws-amplify/core';
import { IoTJobsDataPlane } from 'aws-sdk/clients/all';

let currentUser;
Auth.currentAuthenticatedUser().then(user => {
    currentUser = user.username;
})

class Dndb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cClass: "",
            race: "Human",
            background: "",
            appearance: "",
            derp: "",
            health: 7,
            plotPoints: 1,
            trainedSkills: [],
            currentSpecials: {},
            inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
            level: 1,
            experience: 0,
            regulation: true
        }
        this.updateState = this.updateState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateRandomCharacter = this.generateRandomCharacter.bind(this);
        this.characterSave = this.characterSave.bind(this);
        this.loadCharacter = this.loadCharacter.bind(this);
        this.getChar = this.getChar.bind(this);
    }
    
    updateState(key, val) {
        let newState = Object.assign({}, this.state);
        newState[key] = val;
        this.setState(newState);
    };

    generateRandomCharacter() {
        let newState = Object.assign({}, this.state);
        newState['cClass'] = random(CLASSES);
        newState['race'] = randomRace();
        newState['background'] = random(BACKGROUNDS);
        newState['appearance'] = random(APPEARANCES);
        newState['derp'] = random(DERPS);
        newState['trainedSkills'] = [random(SKILLS)];
        this.setState(newState);
    }

    loadCharacter(character) {
        character['trainedSkills'] = JSON.parse(character['trainedSkills'])
        character['currentSpecials'] = JSON.parse(character['currentSpecials'])
        character['inventory'] = JSON.parse(character['inventory'])
        this.setState(character);
    }

    clearSheet() {
        this.setState({
            name: "",
            cClass: "",
            race: "Human",
            background: "",
            appearance: "",
            derp: "",
            health: 7,
            plotPoints: 1,
            trainedSkills: [],
            currentSpecials: {},
            inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
            level: 1,
            experience: 0,
            regulation: true
        })
    }

    handleChange(event) {
        if (event.target.name === "cClass") {
            let newState = Object.assign({}, this.state);
            newState['currentSpecials'] = {};
            newState['cClass'] = event.target.value
            this.setState(newState);
        } else {
            this.updateState(event.target.name, event.target.value)
        }
    }

    updateHealth(num) {
        this.updateState('health', this.state.health === num ? num - 1 : num);
    }

    healthTrackerDisp() {
        const hearts = [];
        for (let i = 0; i < 7; i++) {
            hearts.push(
                <img key={i}
                    id={`heart-${i + 1}`}
                    alt="Health"
                    className="heart-container"
                    onClick={() => this.updateHealth(i + 1)}
                    src={this.state.health >= i + 1 ?
                        "http://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png" : 
                        "http://icons.iconarchive.com/icons/icons8/windows-8/256/Gaming-Hearts-icon.png"}
                />
            )
        }
        return (
            <div>
                {hearts}
            </div>
        )
    }

    updatePlotPoints(num) {
        this.updateState('plotPoints', this.state.plotPoints === num ? num - 1 : num);
    }

    plotPointsTrackerDisp() {
        const pp = [];
        for (let i = 0; i < 3; i++) {
            pp.push(
                <span key={i}
                    id={`pp-${i + 1}`}
                    className="pp-container"
                    onClick={() => this.updatePlotPoints(i + 1)}
                    style={{cursor: 'pointer'}}
                >
                    {this.state.plotPoints >= i + 1 ? "⦿" : "⦾"}
                </span>
            )
        }
        return (
            <div>
                {pp}
            </div>
        )
    }

    characterSave() {
        this.getChar(this.state.name).then(response => {
            const existingChar = response[0];
            console.log(existingChar)
            if (!existingChar || existingChar.playerName === currentUser) {
                this.put();
            } else {
                alert(`There's already a character named ${this.state.name}. Don't blame me, blame ${existingChar.playerName}.`);
            }
        })
    }

    put = async () => {
        console.log('calling api post');
        let newChar = Object.assign({}, this.state);
        newChar['playerName'] = currentUser;
        newChar['trainedSkills'] = JSON.stringify(this.state.trainedSkills);
        newChar['currentSpecials'] = JSON.stringify(this.state.currentSpecials);
        newChar['inventory'] = JSON.stringify(this.state.inventory);
        newChar['regulation'] = this.state.regulation ? "true" : "false";
        const response = await API.put('dndb', '/dndb', {
            body: {
                ...newChar
            }
        });
        alert(`Character saved!`);
    }

    get = async () => {
        console.log('calling api get');
        let myChars = [];
        let otherChars = [];
        const response = await API.get('dndb', '/dndb');
        response.data.forEach(char => {
            if (char.playerName === currentUser) {
                myChars.push(char);
            } else {
                otherChars.push(char);
            }
        })
        console.log(`My characters:`)
        console.log(myChars)
        console.log(`Other characters:`)
        console.log(otherChars)
        return myChars;
    }

    getChar = async (charName) => {
        console.log('calling api get');
        const response = await API.get('dndb', `/dndb/${charName}`)
        return response;
    }

    render() {
        return (
            <BackendWrapper>
            <div id="dndb-container">
                <div id="sheet-header">
                    <h1>Dungeons & Douchebags</h1>
                </div>
                <CharSelect get={this.get} loadCharacter={this.loadCharacter} />
                <button onClick={this.generateRandomCharacter}>Generate Random Character</button>
                <button onClick={this.get}>List all characters</button>
                <button onClick={this.characterSave}>Save Character</button>
                <div id="main-section">
                    <div className="sheet-row">
                        <span>Name: <input type="text" name="name" id="name-input" onChange={this.handleChange} value={this.state.name}></input></span>
                        Class: <select name="cClass" onChange={this.handleChange} value={this.state.cClass}>
                            <option value="" disabled>Select Class</option>
                            {CLASSES.map((c, i) => {
                                return (
                                    <option key={i} value={c}>{c}</option>
                                )
                            })}
                        </select>
                        <button className="randomize-button" onClick={() => this.updateState('cClass', random(CLASSES))}>Randomize</button>
                        Race <span style={{fontSize: '9px'}}>(but not in like a racist way)</span>: <select name="race" onChange={this.handleChange} value={this.state.race}>
                            <option value="Human">Human</option>
                            {ALTRACES.map((r, i) => {
                                return (
                                    <option key={i} value={r}>{r}</option>
                                )
                            })}
                        </select>
                        <button className="randomize-button" onClick={() => this.updateState('race', randomRace())}>Randomize</button>
                    </div>
                    <div className="sheet-row">
                        <div className="health-tracker">
                            Health
                            {this.healthTrackerDisp()}
                        </div>
                        <div className="plot-points-tracker">
                            Plot Points
                            {this.plotPointsTrackerDisp()}
                        </div>
                    </div>
                    <div className="sheet-row">
                        <span>Background: <input type="text" name="background" onChange={this.handleChange} value={this.state.background} id="background-input"></input></span>
                        <button className="randomize-button" onClick={() => this.updateState('background', random(BACKGROUNDS))}>Randomize</button>
                        <span>Appearance: <input type="text" name="appearance" onChange={this.handleChange} value={this.state.appearance} id="appearance-input"></input></span>
                        <button className="randomize-button" onClick={() => this.updateState('appearance', random(APPEARANCES))}>Randomize</button>
                        <span>Derp: <input type="text" name="derp" onChange={this.handleChange} value={this.state.derp} id="derp-input"></input></span>
                        <button className="randomize-button" onClick={() => this.updateState('derp', random(DERPS))}>Randomize</button>
                    </div>
                </div>
                <div id="class-section">
                    <ClassMain {...this.state} updateState={this.updateState} />
                </div>
                <div id="skills-section">
                    <Skills {...this.state} updateState={this.updateState} />
                </div>
                <div id="inventory-section">
                    <Inventory {...this.state} updateState={this.updateState} />
                </div>
                <div id="inventory-section">
                    <Advancement {...this.state} updateState={this.updateState} />
                </div>
            </div>
            </BackendWrapper>
        )
    }
}

export default Dndb;