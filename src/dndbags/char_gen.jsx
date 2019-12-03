import React from 'react';
import { CLASSES, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';

class CharGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            rerolls: 0,
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

    selectClass() {

    }

    selectSkills() {

    }

    selectStartingEquipment() {

    }

    selectDetails() {

    }

    render() {

    }
}

export default CharGen;