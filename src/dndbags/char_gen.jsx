import React from 'react';
import { CLASSES, CLASS_COLORS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS, CLASS_DESCRIPTIONS } from '../dndb-tables';

class CharGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            rerolls: 4,
            selected: null,
            char: {
                name: "",
                cClass: "",
                raceString: "",
                raceTraits: [],
                background: "",
                appearance: "",
                derp: "",
                health: 7,
                plotPoints: 1,
                selectedFightingSkill: "",
                trainedSkills: [],
                currentSpecials: {},
                inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
                level: 1,
                experience: 0,
                advancements: [],
                savedTag: "",
                favoriteTags: [],
                rerolls: 0,
                regulation: true
            }
        }
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
        if (this.state.selected) {
            classHeadline = <h2 id="class-headline" style={{ backgroundColor: CLASS_COLORS[this.state.selected] }}>{this.state.selected}</h2>
        }
        return (
            <>
                <h1>Class</h1>
                <div onClick={() => this.setState({selected: random(CLASSES)})}>Random</div>
                <div className="class-selections">
                    {CLASSES.map((c, i) => {
                        return (
                            <>
                            <button key={i}
                                className={`class-button${this.state.selected === c ? " selected" : ""}`}
                                onClick={() => this.setState({selected: c})}
                                style={{backgroundColor: CLASS_COLORS[c]}}>
                                {c}
                            </button>
                            </>
                        )
                    })}
                </div>
                <div className="selected-class-info">
                    {classHeadline}
                    <div>{CLASS_DESCRIPTIONS[this.state.selected]}</div>
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