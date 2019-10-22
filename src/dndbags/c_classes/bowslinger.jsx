import React, { useState } from 'react';
import { ELEMENTS, GERUNDS, random } from '../../dndb-tables';

export default function Bowslinger(props) {
    let { currentSpecials } = props;

    const [savableAmmo, setSavableAmmo] = useState([])

    function randomAmmo() {
        let wordCat = random([ELEMENTS, GERUNDS]);
        return random(wordCat);
    }

    function createAmmo() {
        let ammo = [];
        for(let i = 0; i < 5; i++) {
            ammo.push(randomAmmo());
        };
        props.updateState('currentSpecials', {'ammo': ammo})
    }

    function consumeAmmo(ammoInd) {    
        const newSavable = savableAmmo
        newSavable.push(currentSpecials.ammo[ammoInd])
        setSavableAmmo(newSavable);
        let newAmmo = currentSpecials.ammo;
        newAmmo.splice(ammoInd, 1);
        props.updateState('currentSpecials', {'ammo': newAmmo});
    }

    function recoverAmmo(ammo, ind) {
        let newAmmo = currentSpecials.ammo;
        newAmmo.push(ammo);
        props.updateState(newAmmo);
        loseAmmo(ind);
    }

    function loseAmmo(ind) {
        let newSavable = savableAmmo;
        newSavable.splice(ind, 1);
        setSavableAmmo([...newSavable]);
    }

    function ammoDisp() {
        if (currentSpecials.ammo) {
            return (
                <ul style={{listStyle: 'none'}}>
                    {currentSpecials.ammo.map((shot, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div>{shot} Ammo</div>
                                </li>
                                <button onClick={() => consumeAmmo(i)}>Use</button>
                            </div>
                        )
                    })}
                </ul>
            )
        }
    }

    function savableAmmoDisp() {
        if (savableAmmo.length > 0) {
            return (
                <>
                <h3>Fired Ammo</h3>
                <ul style={{ listStyle: 'none' }}>
                    {savableAmmo.map((shot, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div>{shot} Ammo</div>
                                </li>
                                <button onClick={() => recoverAmmo(shot, i)}>Recovered</button>
                                <button onClick={() => loseAmmo(i)}>Lost</button>
                            </div>
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
                <br />
                <div>Magic Ability:<br /><strong>Graduate Weapon</strong></div>
                <div>Your capstone project is a shapechanging weapon. Whenever you defeat an enemy in battle, it gains one charge. You can spend one charge to:</div>
                <ul>
                    <li>Activate its magical property for one action</li>
                    <li>Change its weapon type or its magical property</li>
                </ul>
            </div>
            <div className="class-ability-display">
                <div id="ammo-lists">
                    <div id="bowslinger-ammo">
                        {ammoDisp()}
                    </div>
                    <div id="savable-ammo">
                        {savableAmmoDisp()}
                    </div>
                </div>
                <div>
                    <button className="randomize-button" onClick={createAmmo}>Randomize Ammo</button>
                </div>
            </div>
        </div>
    )
}