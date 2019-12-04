import React from 'react';
import { CLASSES, CLASS_COLORS, RACE_TRAITS, random, BACKGROUNDS, APPEARANCES, DERPS, CLASS_DESCRIPTIONS } from '../../dndb-tables';
import CharGenClass from './char_gen_class';
import CharGenSkills from './char_gen_skills';

class CharGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            rerolls: 4,
            char: {
                name: "",
                cClass: "",
                raceString: "",
                raceTraits: null,
                background: "",
                appearance: "",
                derp: "",
                selectedFightingSkill: "",
                trainedSkills: [],
                inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
                regulation: true
            }
        }
        this.updateSelection = this.updateSelection.bind(this);
    }

    updateSelection(field, value, reroll) {
        let newChar = Object.assign({}, this.state.char);
        newChar[field] = value;
        let newRerolls = this.state.rerolls - 1;
        this.setState({rerolls: reroll ? newRerolls : this.state.rerolls, char: newChar});
    }

    progress() {
        switch (this.state.stage) {
            case 1:
            case 2:
            case 3:
            case 4:
            default:
                return
        }
    }

    selectSkills() {

    }

    selectStartingEquipment() {

    }

    selectDetails() {

    }

    confirmation() {
        
    }

    stageText() {
        switch (this.state.stage) {
            case 1:
                return "Class";
            case 2:
                return "Skills";
            case 3:
                return "Equipment";
            case 4:
                return "Details";
            default:
                return "Confirmation";
        }
    }

    selectionArea() {
        switch (this.state.stage) {
            case 1:
                return <CharGenClass
                    cClass={this.state.char.cClass}
                    updateSelection={this.updateSelection}
                    rerolls={this.state.rerolls}
                />
            case 2:
                return <CharGenSkills
                    raceString={this.state.char.raceString}
                    raceTraits={this.state.char.raceTraits}
                    updateSelection={this.updateSelection}
                    rerolls={this.state.rerolls}
                />
            case 3:
                return this.selectStartingEquipment();
            case 4:
                return this.selectDetails();
            default:
                return this.confirmation();
        }
    }

    render() {
        return (
            <div id="char-gen-main">
                <div className="rerolls-container">
                    <h3>{this.state.rerolls}</h3>
                    <h3>Rerolls Remaining</h3>
                </div>
                <button onClick={() => this.props.setCharGen(false)}>X</button>
                <div id="char-gen-progress">
                    {this.progress()}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={() => this.setState({stage: this.state.stage - 1})}>{this.state.stage != 1 ? "<<" : ""}</button>
                    <h1>{this.stageText()}</h1>
                    <button onClick={() => this.setState({stage: this.state.stage + 1})}>{">>"}</button>
                </div>
                <div id="char-gen-selection-area">
                    {this.selectionArea()}
                </div>
            </div>
        )
    }
}

export default CharGen;