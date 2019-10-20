import React, { useState } from 'react';
import { random, WEAPONS, GERUNDS, ELEMENTS } from '../../dndb-tables';

export default function Battlebro(props) {
    let { currentSpecials } = props;
    //When possible, take this off the local state and move it up to main state
    const [charge, setCharge] = useState(currentSpecials.charge || 1);
    // let weaponEdited = false;

    function randomizeWeapon() {
        let newSpecials = Object.assign({}, currentSpecials);
        // delete newSpecials.weaponString;
        newSpecials.weaponType = ` ${random(WEAPONS.slice(0, 18))}`;
        let newWeaponSpecial;
        const useVerb = random([true, false]);
        if (useVerb) {
            newWeaponSpecial = {"verb": `${random(GERUNDS)} `};
        } else {
            newWeaponSpecial = {"element": ` of ${random(ELEMENTS)}`};
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
            newSpecials.weaponSpecial = { "element": ` of ${random(ELEMENTS)}` };
        }
        props.updateState("currentSpecials", newSpecials);
    }

    function weaponName() {
        if (!currentSpecials.weaponType || !currentSpecials.weaponSpecial) {
            return <input type="text"></input>
        // } else if (currentSpecials.weaponString) {
        //     return <input type="text" value={currentSpecials.weaponString} />
        } else if (Object.keys(currentSpecials.weaponSpecial)[0] === "verb") {
            return <input type="text" value={currentSpecials.weaponSpecial["verb"] + currentSpecials.weaponType} />
        } else {
            return <input type="text" value={currentSpecials.weaponType + currentSpecials.weaponSpecial["element"]} />
        }
    }

    // function saveWeaponString(weaponString) {
    //     props.updateState(currentSpecials.weaponString, weaponString);
    // }

    // function weaponStringButton() {
    //     if (weaponEdited) {
    //         return (

    //         )
    //     }
    // }

    function setChargeNum(num) {
        charge === num ? setCharge(charge - 1) : setCharge(num);
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br/>
                <div>Magic Ability:<br/><strong>Graduate Weapon</strong></div>
                <div>Your capstone project is a shapechanging weapon. Whenever you defeat an enemy in battle, it gains one charge. You can spend one charge to:</div>
                <ul>
                    <li>Activate its magical property for one action</li>
                    <li>Change its weapon type or its magical property</li>
                </ul>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {weaponName()}
                </div>
                <div id="battlebro-charges">
                    <button onClick={() => setChargeNum(1)}>{charge >= 1 ? "⦿" : "⦾"}</button>
                    <button onClick={() => setChargeNum(2)}>{charge >= 2 ? "⦿" : "⦾"}</button>
                    <button onClick={() => setChargeNum(3)}>{charge >= 3 ? "⦿" : "⦾"}</button>
                </div>
                <div>
                    <button className="randomize-button" onClick={randomizeWeapon}>Randomize Weapon</button>
                </div>
                <div>
                    <button className="randomize-button" onClick={randomizeWeaponType}>Randomize Weapon Type</button>
                    <button className="randomize-button" onClick={randomizeWeaponSpecial}>Randomize Weapon Special Quality</button>
                </div>
            </div>
        </div>
    )
}