import React from 'react';
import { SKILLS, random } from '../../dndb-tables';

export default function KnightOfTushuze(props) {
    let { currentSpecials } = props;
    const input = React.createRef();

    if (!currentSpecials.blessings) {
        props.updateState('currentSpecials', { 'blessings': [] })
    }

    function randomBlessing() {
        return random(SKILLS);
    }

    function createBlessings() {
        let blessings = [];
        for (let i = 0; i < 4; i++) {
            blessings.push(randomBlessing());
        };
        props.updateState('currentSpecials', { 'blessings': blessings })
    }

    function consumeBlessing(blessingInd) {
        let newBlessings = currentSpecials.blessings;
        newBlessings.splice(blessingInd, 1);
        props.updateState('currentSpecials', { 'blessings': newBlessings });
    }

    function addCustomBlessing() {
        let newBlessings = currentSpecials.blessings;
        newBlessings.push(input.current.value);
        props.updateState('currentSpecials', { 'blessings': newBlessings });
    }

    function blessingsDisplay() {
        if (currentSpecials.blessings) {
            return (
                <ul className="resource-list">
                    {currentSpecials.blessings.map((blessing, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div>Blessing of <strong>{blessing}</strong></div>
                                <button onClick={() => consumeBlessing(i)}>Use</button>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A knight of a righteous and goodly order, doing good deeds and providing nice blessings.</div>
                <br />
                <div className="ability-desc">
                    <div>Magic Ability:<br /><strong>Blessings of Tushuze</strong></div>
                    <div>Members of the order gain four blessings per day, and can gain more by doing good deeds. You can spend a Blessing to:</div>
                    <ul>
                        <li>Give yourself or an ally Magic Advantage on an action using the listed Skill</li>
                        <li>Create an intensely bright light that evil things hate for the duration of the scene</li>
                        <li>Heal yourself or an ally for 1d6 Health</li>
                    </ul>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="resource-lists-container" id="blessing-list">
                    {blessingsDisplay()}
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div className="custom-add-row">
                            <div>Add Blessing: </div>
                            <div className="custom-add-field">
                                <select ref={input}>
                                    <option value="Believe in Yourself">Believe in Yourself (Bravery)</option>
                                    <option value="Brute Force">Brute Force (Bravery)</option>
                                    <option value="Cardio">Cardio (Bravery)</option>
                                    <option value="Creepin'">Creepin' (Honor)</option>
                                    <option value="Macgyver">Macgyver (Charity)</option>
                                    <option value="Man vs. Wild">Man vs. Wild (Honor)</option>
                                    <option value="Rad Moves">Rad Moves (Honor)</option>
                                    <option value="Spottin'">Spottin' (Charity)</option>
                                    <option value="Thinkiness">Thinkiness (Charity)</option>
                                </select>
                            <button onClick={addCustomBlessing}>+</button>
                            </div>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createBlessings}>Randomize Blessings</button>
                </div>
            </div>
        </div>
    )
}