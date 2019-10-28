import React from 'react';
import Amplify, { Storage, API, Auth } from 'aws-amplify';
import { CLASSES, SKILLS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';
import Skills from './skills';
import ClassMain from './class_main';
import Inventory from './inventory';
import Advancement from './advancement';

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
    }

    componentDidMount() {
        console.log(`loadedChar: ${this.props.loadedChar}`)
        if (this.props.loadedChar) {
            this.setState(this.props.loadedChar);
        }
    }
    
    updateState(key, val) {
        let newState = Object.assign({}, this.state);
        newState[key] = val;
        this.setState(newState);
    };

    // clearSheet() {
    //     this.setState({
    //         name: "",
    //         cClass: "",
    //         race: "Human",
    //         background: "",
    //         appearance: "",
    //         derp: "",
    //         health: 7,
    //         plotPoints: 1,
    //         trainedSkills: [],
    //         currentSpecials: {},
    //         inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
    //         level: 1,
    //         experience: 0,
    //         regulation: true
    //     })
    // }

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
                <div key={i}>
                <img key={i}
                    id={`heart-${i + 1}`}
                    alt="Health"
                    className="heart-container"
                    onClick={() => this.updateHealth(i + 1)}
                    src={this.state.health >= i + 1 ?
                        "http://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png" : 
                        "http://icons.iconarchive.com/icons/icons8/windows-8/256/Gaming-Hearts-icon.png"}
                />
                </div>
            )
        }
        return (
            <div style={{display: 'flex'}}>
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
            <div style={{ display: 'flex' }}>
                {pp}
            </div>
        )
    }

    render() {
        return (
            <div id="dndb-main">
                <div id="dndb-sheet-container">
                    <div id="sheet-header">
                        <h1 className="color-header">Dungeons & Douchebags</h1>
                    </div>
                    <div id="main-button-row">
                        <button onClick={this.props.randomChar}>Randomize New Character</button>
                        <button disabled={this.state.name === ""} onClick={() => this.props.saveChar(this.state)}>Save Character</button>
                        <button onClick={this.props.clearChar}>Load Char<br/>(Save first!)</button>
                    </div>
                    <div id="main-section">
                        <div className="sheet-row">
                            <div className="field-container">
                                <div className="field-header">Name: </div>
                                <input type="text" name="name" id="name-input" onChange={this.handleChange} value={this.state.name}></input>
                            </div>
                            <div className="field-container">
                                <div className="field-header">Class: </div>
                                <div className="sub-field">
                                    <select name="cClass" onChange={this.handleChange} value={this.state.cClass}>
                                        <option value="" disabled>Select Class</option>
                                        {CLASSES.map((c, i) => {
                                            return (
                                                <option key={i} value={c}>{c}</option>
                                            )
                                        })}
                                    </select>
                                    <button className="randomize-button" onClick={() => this.updateState('cClass', random(CLASSES))}>🎲</button>
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="field-header">Race <span style={{fontSize: '9px'}}>(but not in like a racist way)</span>:</div>
                                <div className="sub-field">
                                    {/* Bug with 'Animal-person' in race selector */}
                                    <select name="race" onChange={this.handleChange} value={this.state.race}>
                                        <option value="Human">Human</option>
                                        {ALTRACES.map((r, i) => {
                                            return (
                                                <option key={i} value={r}>{r}</option>
                                            )
                                        })}
                                    </select>
                                    <button className="randomize-button" onClick={() => this.updateState('race', randomRace())}>🎲</button>
                                </div>
                            </div>
                        </div>
                        <div className="sheet-row">
                            <div className="field-container">
                                <div className="field-header">Background: </div>
                                <div className="sub-field">
                                    <input type="text" name="background" onChange={this.handleChange} value={this.state.background} id="background-input"></input>
                                    <button className="randomize-button" onClick={() => this.updateState('background', random(BACKGROUNDS))}>🎲</button>
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="field-header">Appearance: </div>
                                <div className="sub-field">
                                    <input type="text" name="appearance" onChange={this.handleChange} value={this.state.appearance} id="appearance-input"></input>
                                    <button className="randomize-button" onClick={() => this.updateState('appearance', random(APPEARANCES))}>🎲</button>
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="field-header">Derp: </div>
                                <div className="sub-field">
                                    <input type="text" name="derp" onChange={this.handleChange} value={this.state.derp} id="derp-input"></input>
                                    <button className="randomize-button" onClick={() => this.updateState('derp', random(DERPS))}>🎲</button>
                                </div>
                            </div>
                        </div>
                        <div className="sheet-row">
                            <div className="health-tracker">
                                <div className="field-header">Health</div>
                                {this.healthTrackerDisp()}
                            </div>
                            <div className="plot-points-tracker">
                                <div className="field-header">Plot Points</div>
                                {this.plotPointsTrackerDisp()}
                            </div>
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
                    <div id="advancement-section">
                        <Advancement {...this.state} updateState={this.updateState} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dndb;