import React, { useState } from 'react';
import { random, WEAPONS, GERUNDS, ELEMENTS_OF, ELEMENTS } from '../../dndb-tables';

export default function Battlebro(props) {
    let { currentSpecials } = props;
    const [currentWeapon, setCurrentWeapon] = useState({'type': randomWeaponType()});
    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();

    if (!currentSpecials.weapons) {
        props.updateState('currentSpecials', { 'weapons': [] });
    }

    function randomWeaponType() {
        return random(WEAPONS.slice(0,18));
    }

    function randomWeapon() {
        const specialCat = random(["Verb", "Element"]);
        const special = specialCat === "Verb" ? random(GERUNDS) : random(ELEMENTS_OF);
        return { 'category': specialCat, 'special': special, 'type': randomWeaponType() }
    }

    function addCustomWeapon(randomize) {
        let newWeapons = currentSpecials.weapons;
        if (randomize) {
            newWeapons.push(randomWeapon());
        } else {
            newWeapons.push({ 'category': input1.current.value, 'special': input2.current.value, 'type': input3.current.value });
        }
    }

    function weaponString(weapon) {
        if (!weapon.special) {
            return weapon.type;
        }
        if (weapon.category === "Verb") {
            return weapon.special + " " + weapon.type;
        } else {
            return weapon.type + " of " + weapon.special;
        }
    }

    function transformWeapon(weaponInd) {
        const newWeapon = currentSpecials.weapons[weaponInd]
        setCurrentWeapon({ 'category': newWeapon.category, 'special': newWeapon.special, 'type': newWeapon.type });
        let newWeapons = currentSpecials.weapons;
        newWeapons.splice(weaponInd, 1);
        props.updateState('currentSpecials', { 'weapons': newWeapons });
    }

    function createWeaponForms() {
        setCurrentWeapon({ 'type': randomWeaponType() })
        let weapons = [];
        for (let i = 0; i < 3; i++) {
            weapons.push(randomWeapon());
        }
        props.updateState('currentSpecials', { 'weapons': weapons });
    }

    function currentWeaponDisp() {
        let endSceneButton;
        if (currentWeapon.special) endSceneButton = <button onClick={() => {
            let nullSpecial = Object.assign({}, currentWeapon);
            nullSpecial.special = null;
            setCurrentWeapon(nullSpecial);
        }}>End Scene</button>

        return (
            <>
            <div><strong>{weaponString(currentWeapon)}</strong></div>
            {endSceneButton}
            </>
        )
    }

    function weaponsDisp() {
        if (currentSpecials.weapons) {
            return (
                <>
                    <h3>Weapon Forms</h3>
                    <ul className="resource-list">
                        {currentSpecials.weapons.map((weapon, i) => {
                            return (
                                <li key={i} className="resource-list-entry">
                                    <div><strong>{weaponString(weapon)}</strong></div>
                                    <button onClick={() => transformWeapon(i)}>Use</button>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br/>
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br/><strong>Graduate Weapon</strong></div>
                        <div>Your capstone project from Fighter College is a shapechanging weapon. Whenever you rest, it changes shape and generates a set of three weapon types, each with a magical property.</div>
                        <div>You can expend one of the other forms to transform the weapon into that shape and it takes on that magic property for the rest of the scene.</div>
                        <div>At the end of the scene, it remains in the last weapon form you gave it. Activating another form before the end of the scene overwrites the current form and magic property.</div>
                        <br/>
                        <div>Resource Item:<br/><strong>Weapon Oil</strong></div>
                        <div>Use a Weapon Oil to charge your weapon with the oil's property. You can also randomize its form.</div> 
                        <br/>
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main" style={{flexDirection: 'column'}}>
                    {currentWeaponDisp()}
                </div>
                <div className="resource-lists-container" id="weapon-list">
                    <div id="types-display">
                        {weaponsDisp()}
                    </div>
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Weapon Form: </div>
                        <div className="custom-add-field">
                            <select ref={input1}>
                                <option value="Verb">Verb</option>
                                <option value="Element">Element</option>
                            </select>
                        </div>
                        <div className="custom-add-field">
                            <div>Magic Property</div>
                            <input style={{ width: '30vw' }} type="text" ref={input2}></input>
                        </div>
                        <div className="custom-add-field">
                            <div>Weapon Type</div>
                            <input style={{ width: '30vw' }} type="text" ref={input3}></input>
                            <button onClick={() => addCustomWeapon(false)}>+</button>
                            <button onClick={() => addCustomWeapon(true)}>🎲</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createWeaponForms}>Generate Weapon Forms<br />(On rest)</button>
                </div>
            </div>
        </div>
    )
}