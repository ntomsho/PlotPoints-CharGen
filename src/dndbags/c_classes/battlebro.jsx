import React, { useState } from 'react';
import { random, WEAPONS, GERUNDS, ELEMENTS_OF } from '../../dndb-tables';

export default function Battlebro(props) {
    let { currentSpecials } = props;
    //When possible, take this off the local state and move it up to main state
    const [charge, setCharge] = useState(currentSpecials.charge || 1);
    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();

    if (!currentSpecials.weaponType) {
        // let newSpecials = Object.assign({}, currentSpecials);
        // newSpecials.weaponType = random(WEAPONS.slice(0, 18));
        // props.updateState("currentSpecials", newSpecials);
        props.updateState('currentSpecials', { 'weaponType': random(WEAPONS.slice(0, 18)) });
    }

    function randomizeWeapon() {
        if (charge > 0) {
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
            setCharge(charge - 1);
            props.updateState("currentSpecials", newSpecials);
        }
    }

    function changeWeaponType() {
        let newSpecials = Object.assign({}, currentSpecials);
        newSpecials.weaponType = ` ${input3.current.value}`;
        props.updateState("currentSpecials", newSpecials);
    }

    function changeWeaponSpecial() {
        let newSpecials = Object.assign({}, currentSpecials);
        if (input1.current.value === "Verb") {
            newSpecials.weaponSpecial = { "verb": `${input2.current.value} ` };
        } else {
            newSpecials.weaponSpecial = { "element": ` of ${input2.current.value}` };
        }
        props.updateState("currentSpecials", newSpecials);
    }

    function weaponName() {
        let weaponString;
        let activateButton;
        if (currentSpecials.weaponType && currentSpecials.weaponSpecial) {
            if (Object.keys(currentSpecials.weaponSpecial)[0] === "verb") {
                weaponString = currentSpecials.weaponSpecial["verb"] + currentSpecials.weaponType;
            } else {
                weaponString = currentSpecials.weaponType + currentSpecials.weaponSpecial["element"];
            }
        } else if (currentSpecials.weaponType) {
            weaponString = currentSpecials.weaponType;
        }
        if (currentSpecials.weaponSpecial) activateButton = <button onClick={activateWeaponSpecial}>Activate Weapon Special</button>

        return (
            // <input type="text" onChange={handleChange} value={weaponString} />
            <>
            <div><strong>{weaponString}</strong></div>
            {activateButton}
            </>
        )
    }

    function setChargeNum(num) {
        charge === num ? setCharge(charge - 1) : setCharge(num);
    }

    function activateWeaponSpecial() {
        let newSpecials = Object.assign({}, currentSpecials);
        newSpecials.weaponSpecial = { "verb": `` };
        props.updateState("currentSpecials", newSpecials)
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br/>
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br/><strong>Graduate Weapon</strong></div>
                        <div>Your capstone project from Fighter College is a shapechanging weapon. You can spend a point of Charge to change its shape and imbue it with a magical property.</div>
                        <div>When you use that property for a bonus on an action, it is exhausted until you recharge it (though you can continue to use it as a normal weapon).</div>
                        <div>Whenever you rest, the weapon gains a random type and magic property, but resets to 0 Charge. You gain 1 charge anytime you defeat an enemy in battle.</div>
                        <br/>
                        <div>Resource Item:<br/><strong>Weapon Oil</strong></div>
                        <div>Use a Weapon Oil to charge your weapon with the oil's property.</div> 
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main" style={{flexDirection: 'column'}}>
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
                <div className="ability-management-container">
                    <button className="ability-randomize-button" onClick={randomizeWeapon}>Charge Weapon<br/>(-1 Charge)</button>
                    <div className="custom-add-row">
                        <div>Change Weapon Property: </div>
                        <div className="custom-add-field">
                            <select ref={input1}>
                                <option value="Verb">Verb</option>
                                <option value="Element">Element</option>
                            </select>
                            <input style={{ width: '30vw' }} type="text" ref={input2}></input>
                            <button onClick={changeWeaponSpecial}>+</button>
                        </div>
                    </div>
                    <div className="custom-add-row">
                        <div>Change Weapon Type: </div>
                        <div className="custom-add-field">
                            <input style={{ width: '30vw' }} type="text" ref={input3}></input>
                            <button onClick={changeWeaponType}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}