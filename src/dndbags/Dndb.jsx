import React from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { CLASSES, ALTRACES } from '../dndb-tables';
import Skills from './skills';
import ClassMain from './class_main';
import Inventory from './inventory';

class Dndb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cClass: "Verbpriest",
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
    }

    updateState(key, val) {
        let newState = Object.assign({}, this.state);
        newState[key] = val;
        this.setState(newState);
    };

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
            <div id="dndb-container">
                <div id="sheet-header">
                    <h1>Dungeons & Douchebags</h1>
                </div>
                <div id="main-section">
                    <div className="sheet-row">
                        <span>Name: <input type="text" id="name-input"></input></span>
                        Class: <select>
                            {CLASSES.map((c, i) => {
                                return (
                                    <option key={i} value={c}>{c}</option>
                                )
                            })}
                        </select>
                        Race: <select>
                            <option value="Human">Human</option>
                            {ALTRACES.map((r, i) => {
                                return (
                                    <option key={i} value={r}>{r}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="sheet-row">
                        <span>Background: <input type="text" id="background-input"></input></span>
                        <span>Appearance: <input type="text" id="appearance-input"></input></span>
                        <span>Derp: <input type="text" id="derp-input"></input></span>
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
            </DndProvider>
        )
    }
}

export default Dndb;