import React, { useState } from 'react';
import '../../stylesheets/battlebro.css'
import { random, WEAPONS, GERUNDS, ELEMENTS_OF } from '../../dndb-tables';

export default function Battlebro(props) {
    let { currentSpecials } = props;
    //When possible, take this off the local state and move it up to main state
    const [charge, setCharge] = useState(currentSpecials.charge || 1);

    function randomizeWeapon() {
        let newSpecials = Object.assign({}, currentSpecials);
        delete newSpecials.weaponString;
        newSpecials.weaponType = ` ${random(WEAPONS.slice(0, 18))}`;
        let newWeaponSpecial;
        const useVerb = random([true, false]);
        if (useVerb) {
            newWeaponSpecial = {"verb": `${random(GERUNDS)} `};
        } else {
            newWeaponSpecial = {"element": ` of ${random(ELEMENTS_OF)}`};
        }
        newSpecials.weaponSpecial = newWeaponSpecial;
        props.updateState("currentSpecials", newSpecials);
    }

    function randomizeWeaponType() {
        let newSpecials = Object.assign({}, currentSpecials);
        newSpecials.weaponType = ` ${random(WEAPONS.slice(0, 18))}`;
        props.updateState("currentSpecials", newSpecials);
    }

    function randomizeWeaponSpecial() {
        let newSpecials = Object.assign({}, currentSpecials);
        const useVerb = random([true, false]);
        if (useVerb) {
            newSpecials.weaponSpecial = { "verb": `${random(GERUNDS)} ` };
        } else {
            newSpecials.weaponSpecial = { "element": ` of ${random(ELEMENTS_OF)}` };
        }
        props.updateState("currentSpecials", newSpecials);
    }

    function weaponName() {
        let weaponString;
        if (currentSpecials.weaponType && currentSpecials.weaponSpecial) {
            if (Object.keys(currentSpecials.weaponSpecial)[0] === "verb") {
                weaponString = currentSpecials.weaponSpecial["verb"] + currentSpecials.weaponType;
            } else {
                weaponString = currentSpecials.weaponType + currentSpecials.weaponSpecial["element"];
            }
        }

        return (
            <input type="text" onChange={handleChange} value={weaponString} />
        )
    }

    function handleChange(event) {
        const newSpecial = { weaponType: "", weaponSpecial: "", 'weaponString': event.target.value }
        props.updateState('currentSpecials', newSpecial);
    }

    function setChargeNum(num) {
        charge === num ? setCharge(charge - 1) : setCharge(num);
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br/>
                <div className="ability-desc">
                    <div>Magic Ability:<br/><strong>Graduate Weapon</strong></div>
                    <div>Your capstone project is a shapechanging weapon. It resets to 1 charge with a new form when you rest and it gains one charge whenever you defeat an enemy in battle. You can spend one charge to:</div>
                    <ul>
                        <li>Activate its magical property for one action</li>
                        <li>Change its weapon type or its magical property</li>
                    </ul>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {weaponName()}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>Weapon Charge</div>
                    <div className="class-radio-container">
                        <button onClick={() => setChargeNum(1)}>{charge >= 1 ? "⦿" : "⦾"}</button>
                        <button onClick={() => setChargeNum(2)}>{charge >= 2 ? "⦿" : "⦾"}</button>
                        <button onClick={() => setChargeNum(3)}>{charge >= 3 ? "⦿" : "⦾"}</button>
                    </div>
                </div>
                <div>
                    <button className="ability-randomize-button" onClick={randomizeWeaponType}>New Weapon Type</button>
                    <button className="ability-randomize-button" onClick={randomizeWeaponSpecial}>New Weapon Special Quality</button>
                </div>
                <div>
                    <button className="ability-randomize-button" onClick={randomizeWeapon}>Randomize Weapon<br/>(On rest)</button>
                </div>
            </div>
        </div>
    )
}