import React from 'react';
import { CLASSES, CLASS_COLORS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS, CLASS_DESCRIPTIONS } from '../dndb-tables';

class CharGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            rerolls: 4,
            anim: false,
            char: {
                name: "",
                cClass: "",
                raceString: "",
                raceTraits: [],
                background: "",
                appearance: "",
                derp: "",
                selectedFightingSkill: "",
                trainedSkills: [],
                inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
                regulation: true
            }
        }
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

    selectClass() {
        let classHeadline;
        if (this.state.char.cClass) {
            classHeadline = (
                <div className={this.state.anim ? "class-headline extend" : "class-headline"}
                    style={{ backgroundColor: CLASS_COLORS[this.state.char.cClass] }}
                    onAnimationEnd={() => this.setState({anim: false})}
                >
                    <h2>{this.state.char.cClass}</h2>
                </div>
            )
        }
        return (
            <>
                <h1>Class</h1>
                <button onClick={() => {
                    this.setState({anim: true});
                    this.updateSelection('cClass', random(CLASSES), true)
                }}>
                    Random Class</button>
                <div className="class-selections">
                    {CLASSES.map((c, i) => {
                        return (
                            <button key={i}
                                className={`class-button${this.state.char.cClass === c ? " selected" : ""}`}
                                onClick={() => {
                                    this.setState({anim: true});
                                    this.updateSelection('cClass', c);
                                }}
                                style={{backgroundColor: CLASS_COLORS[c]}}>
                                {c}
                            </button>
                        )
                    })}
                </div>
                <div className="selected-class-info">
                    {classHeadline}
                    <div>{CLASS_DESCRIPTIONS[this.state.char.cClass]}</div>
                </div>
            </>
        )
    }

    selectSkills() {

    }

    selectStartingEquipment() {

    }

    selectDetails() {

    }

    selectionArea() {
        switch (this.state.stage) {
            case 1:
                return this.selectClass();
            case 2:
                return this.selectSkills();
            case 3:
                return this.selectStartingEquipment();
            case 4:
                return this.selectDetails();
            default:
                return;
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
                <div id="char-gen-selection-area">
                    {this.selectionArea()}
                </div>
            </div>
        )
    }
}

export default CharGen;