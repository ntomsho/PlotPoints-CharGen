import React from 'react';
import { CLASSES } from '../dndb-tables';


class Dndb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            cClass: "",
            race: "",
            background: "",
            appearance: "",
            derp: "",
            health: 6,
            plotPoints: 1,
            trainedSkills: [],
            currentSpecials: [],
            inventory: []
        }
    }

    render() {
        return (
            <div id="dndb-container">
                <div id="main-info">
                    Name: <input type="text" id="name-input"></input>
                    <select>
                        {CLASSES.map(c => {
                            return (
                                <option value={c}>{c}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export default Dndb;