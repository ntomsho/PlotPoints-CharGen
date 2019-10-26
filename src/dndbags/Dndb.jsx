import React from 'react';
import BackendWrapper from './backend_wrapper';
import Amplify, { Storage, API, Auth } from 'aws-amplify';
import { CLASSES, SKILLS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';
import Skills from './skills';
import ClassMain from './class_main';
import Inventory from './inventory';

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

    post = async () => {
        console.log('calling api');
        let newChar = Object.assign({}, this.state);
        newChar[playerName] = Auth.currentAuthenticatedUser().then(user => user.username);
        const response = await API.post('dndb', '/dndb', {
            body: {
                ...newChar
            }
        });
        alert(JSON.stringify(response, null, 2))
    }

    get = async () => {
        console.log('calling api');
        const response = await API.get('dndb', '/dndbchars');
        alert(JSON.stringify(response, null, 2))
    }

    render() {
        return (
            <BackendWrapper>
            <div id="dndb-container">
                <div id="sheet-header">
                    <h1>Dungeons & Douchebags</h1>
                </div>
                <button onClick={this.generateRandomCharacter}>Generate Random Character</button>
                <button onClick={this.get}>List all characters</button>
                <button onClick={this.post}>Save Character</button>
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
            </div>
            </BackendWrapper>
        )
    }
}

export default Dndb;