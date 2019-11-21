import React, { useState } from 'react';
import { random, WEAPONS, GERUNDS, ELEMENTS_OF } from '../../dndb-tables';

export default function Battlebro(props) {
    let { currentSpecials } = props;
    //When possible, take this off the local state and move it up to main state
    const [currentWeaponType, setCurrentWeaponType] = useState(null);
    const [currentWeaponSpecial, setCurrentWeaponSpecial] = useState(null);
    const [charge, setCharge] = useState(currentSpecials.charge || 1);
    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();

    if (!currentSpecials.weaponTypes || !currentSpecials.weaponSpecials) {
        props.updateState('currentSpecials', { 
            'weaponTypes': currentSpecials.weaponTypes ? currentSpecials.weaponTypes : [],
            'weaponSpecials': currentSpecials.weaponSpecials ? currentSpecials.weaponSpecials : []
        });
    }

    function randomWeaponType() {
        return random(WEAPONS.slice(0,18));
    }

    function randomWeaponSpecial() {
        return random([
                {'category': "Verb", 'special': random(GERUNDS)},
                {'category': "Element", 'special': random(ELEMENTS_OF)}
            ])
    }

    function addCustomWeaponType(randomize) {
        let newWeaponTypes = currentSpecials.weaponTypes;
        if (randomize) {
            newWeaponTypes.push(randomWeaponType());
        } else {
            newWeaponTypes.push(input3.current.value)
        }
        props.updateState('currentSpecials', { 'weaponTypes': newWeaponTypes, 'weaponSpecials': currentSpecials.weaponSpecials })
    }

    function addCustomWeaponSpecial(randomize) {
        let newWeaponSpecials = currentSpecials.weaponSpecials;
        if (randomize) {
            newWeaponSpecials.push(randomWeaponSpecial());
        } else {
            newWeaponSpecials.push({ 'category': input1.current.value, 'special': input2.current.value })
        }
        props.updateState('currentSpecials', { 'weaponTypes': currentSpecials.weaponTypes, 'weaponSpecials': newWeaponSpecials })
    }

    function removeWeaponType(typeInd) {
        let newWeaponTypes = currentSpecials.weaponTypes;
        newWeaponTypes.splice(typeInd, 1);
        props.updateState('currentSpecials', { 'weaponTypes': newWeaponTypes, 'weaponSpecials': currentSpecials.weaponSpecials });
    }

    function activateWeaponSpecial(specialInd) {
        if (currentWeaponType !== null) {
            let newWeaponSpecials = [...currentSpecials.weaponSpecials];
            newWeaponSpecials.splice(specialInd, 1);
            setCurrentWeaponSpecial(currentSpecials.weaponSpecials[specialInd]);
            props.updateState('currentSpecials', { 'weaponTypes': currentSpecials.weaponTypes, 'weaponSpecials': newWeaponSpecials });
        }
    }

    function createTypesAndSpecials() {
        let weaponTypes = [];
        let weaponSpecials = [];
        for (let i = 0; i < 3; i++) {
            let newType = randomWeaponType();
            while (weaponTypes.includes(newType)) {
                newType = randomWeaponType();
            }
            weaponTypes.push(newType);
        };
        for (let i = 0; i < 4; i++) {
            weaponSpecials.push(randomWeaponSpecial());
        };
        props.updateState('currentSpecials', { 'weaponTypes': weaponTypes, 'weaponSpecials': weaponSpecials});
    }

    function weaponName() {
        let weaponString;
        let endSceneButton;
        if (currentWeaponType !== null && currentWeaponSpecial !== null) {
            if (currentWeaponSpecial.category === "Verb") {
                weaponString = currentWeaponSpecial.special + " " + currentSpecials.weaponTypes[currentWeaponType];
            } else {
                weaponString = currentSpecials.weaponTypes[currentWeaponType] + " of " + currentWeaponSpecial.special;
            }
        } else if (currentWeaponType !== null) {
            weaponString = currentSpecials.weaponTypes[currentWeaponType];
        }
        if (currentWeaponSpecial !== null) endSceneButton = <button onClick={() => setCurrentWeaponSpecial(null)}>End Scene</button>

        return (
            <>
            <div><strong>{weaponString}</strong></div>
            {endSceneButton}
            </>
        )
    }

    function setChargeNum(num) {
        charge === num ? setCharge(charge - 1) : setCharge(num);
    }

    function chargeDisp() {
        return (
            <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>Weapon Charge</div>
            <div className="class-radio-container">
                <button onClick={() => setChargeNum(1)}>{charge >= 1 ? "⦿" : "⦾"}</button>
                <button onClick={() => setChargeNum(2)}>{charge >= 2 ? "⦿" : "⦾"}</button>
                <button onClick={() => setChargeNum(3)}>{charge >= 3 ? "⦿" : "⦾"}</button>
            </div>
            </div>
            <button className="ability-randomize-button" onClick={''}>Charge Weapon<br />(-1 Charge)</button>
            </>
        )
    }

    function weaponTypesDisp() {
        if (currentSpecials.weaponTypes) {
            return (
                <>
                <h3>Weapon Forms</h3>
                <ul className="resource-list">
                    {currentSpecials.weaponTypes.map((wt, i) => {
                        return (
                            <li onClick={() => setCurrentWeaponType(i)} key={i} className="resource-list-entry pointer">
                                <div className={`weaponType${currentWeaponType === i ? ' selected' : ''}`} onClick={() => setCurrentWeaponType(i)}><strong>{wt}</strong></div>
                            </li>
                        )
                    })}
                </ul>
                </>
            )
        }
    }

    function weaponSpecialsDisp() {
        if (currentSpecials.weaponSpecials && currentSpecials.weaponSpecials.length > 0) {
            return (
                <>
                    <h3>Weapon Effects</h3>
                    <ul className="resource-list">
                        {currentSpecials.weaponSpecials.map((ws, i) => {
                            return (
                                <li key={i} className="resource-list-entry">
                                    <div><strong>{ws.special}</strong></div>
                                    <button onClick={() => activateWeaponSpecial(i)}>Use</button>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )
        }
    }

    // function activateWeaponSpecial() {
    //     let newSpecials = Object.assign({}, currentSpecials);
    //     newSpecials.weaponSpecial = { "verb": `` };
    //     props.updateState("currentSpecials", newSpecials)
    // }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br/>
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br/><strong>Graduate Weapon</strong></div>
                        <div>Your capstone project from Fighter College is a shapechanging weapon. Whenever you rest, it generates a set of three weapon types and three magical properties.</div>
                        <div>You can change the Graduate Weapon between any of the three weapon types at will, gaining circumstance Advantage where appropriate.</div>
                        <div>When you activate one of the magical properties, your weapon is imbued with that effect in any form for the duration fo the scene or until you activate another property.</div>
                        <br/>
                        <div>Resource Item:<br/><strong>Weapon Oil</strong></div>
                        <div>Use a Weapon Oil to charge your weapon with the oil's property.</div> 
                        <br/>
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main" style={{flexDirection: 'column'}}>
                    {weaponName()}
                </div>
                <div className="resource-lists-container" id="weapon-list">
                    <div id="specials-display">
                        {weaponSpecialsDisp()}
                    </div>
                    <div id="types-display">
                        {weaponTypesDisp()}
                    </div>
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Change Weapon Property: </div>
                        <div className="custom-add-field">
                            <select ref={input1}>
                                <option value="Verb">Verb</option>
                                <option value="Element">Element</option>
                            </select>
                            <input style={{ width: '30vw' }} type="text" ref={input2}></input>
                            <button onClick={() => addCustomWeaponSpecial(false)}>+</button>
                            <button onClick={() => addCustomWeaponSpecial(true)}>🎲</button>
                        </div>
                    </div>
                    <div className="custom-add-row">
                        <div>Change Weapon Type: </div>
                        <div className="custom-add-field">
                            <input style={{ width: '30vw' }} type="text" ref={input3}></input>
                            <button onClick={() => addCustomWeaponType(false)}>+</button>
                            <button onClick={() => addCustomWeaponType(true)}>🎲</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createTypesAndSpecials}>Generate Weapon Types and Specials<br />(On rest)</button>
                </div>
            </div>
        </div>
    )
}