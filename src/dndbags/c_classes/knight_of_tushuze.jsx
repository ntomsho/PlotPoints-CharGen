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
                <ul style={{ listStyle: 'none' }}>
                    {currentSpecials.blessings.map((blessing, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div>Blessing of {blessing}</div>
                                </li>
                                <button onClick={() => consumeBlessing(i)}>Use</button>
                            </div>
                        )
                    })}
                </ul>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br />
                <div>Magic Ability:<br /><strong>Graduate Weapon</strong></div>
                <div>Your capstone project is a shapechanging weapon. Whenever you defeat an enemy in battle, it gains one charge. You can spend one charge to:</div>
                <ul>
                    <li>Activate its magical property for one action</li>
                    <li>Change its weapon type or its magical property</li>
                </ul>
            </div>
            <div className="class-ability-display">
                <div id="blessing-list">
                    {blessingsDisplay()}
                </div>
                <div>
                    <button className="randomize-button" onClick={createBlessings}>Randomize Blessings</button>
                    <span>Add Blessing: </span>
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
    )
}