import React from 'react';
import { random } from '../../dndb-tables';

export default function KnightOfTushuze(props) {
    let { currentSpecials } = props;
    const input = React.createRef();

    if (!currentSpecials.blessings) {
        props.updateState('currentSpecials', { 'blessings': [] })
    }

    function randomBlessing() {
        return random(["Bravery", "Compassion", "Honor"]);
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

    function blessingSkills(blessing) {
        switch (blessing) {
            case "Bravery":
                return (
                    <>
                    <li>Believe in Yourself</li>
                    <li>Brute Force</li>
                    <li>Cardio</li>
                    </>
                )
            case "Compassion":
                return (
                    <>
                    <li>Macgyver</li>
                    <li>Spottin'</li>
                    <li>Thinkiness</li>
                    </>
                )
            default:
                return (
                    <>
                    <li>Creepin'</li>
                    <li>Man vs. Wild</li>
                    <li>Rad Moves</li>
                    </>
                )
        }
    }

    function blessingsDisplay() {
        if (currentSpecials.blessings) {
            return (
                <ul className="resource-list">
                    {currentSpecials.blessings.map((blessing, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div>
                                    Blessing of <strong>{blessing}</strong>
                                    <ul className="blessing-skills">
                                        {blessingSkills(blessing)}
                                    </ul>
                                </div>
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
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br /><strong>Blessings of Tushuze</strong></div>
                        <div>Members of the order gain four blessings per day, and can gain more by doing good deeds.</div>
                        <br/>
                        <div>Gain a Blessing of Bravery by facing physical harm or other danger on someone else's behalf.</div>
                        <div>Gain a Blessing of Compassion by giving away your belongings or resources to help someone else for no reward.</div>
                        <div>Gain a Blessing of Honor by declining an unfair advantage over an enemy or refusing to lie when it might benefit you.</div>
                        <br/>
                        <div>You can spend a Blessing to:</div>
                        <ul>
                            <li>(Any) Give yourself or an ally Magic Advantage on an action using the listed Skill</li>
                            <li>(Bravery) Create an intensely bright light that evil things hate for the duration of the scene</li>
                            <li>(Compassion) Heal yourself or an ally for 1d6 Health</li>
                            <li>(Honor) Create a divine shield to protect yourself or an ally</li>
                        </ul>
                    </div>
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
                                    <option value="Bravery">Bravery</option>
                                    <option value="Compassion">Compassion</option>
                                    <option value="Honor">Honor</option>
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