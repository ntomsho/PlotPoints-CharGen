import React, { useState } from 'react';
import { ELEMENTS, GERUNDS, random } from '../../dndb-tables';

export default function Bowslinger(props) {
    const { currentSpecials } = props;
    const [savableAmmo, setSavableAmmo] = useState([])
    const input = React.createRef();

    if (!currentSpecials.ammo) {
        props.updateState('currentSpecials', { 'ammo': [] })
    }

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

    function addCustomAmmo() {
        let newAmmo = currentSpecials.ammo;
        newAmmo.push(input.current.value);
        props.updateState('currentSpecials', { 'ammo': newAmmo })
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
                <div className="class-desc">A sharpshooting bounty hunter who constructs special ammunition for their ranged weapon.</div>
                <br />
                <div>Magic Ability:<br /><strong>Magic Ammo</strong></div>
                <div>You are skilled in adding magical properties to arrows, bullets, and throwing weapons. Whenever you rest, you construct five shots of magic ammo, each with a magical property that activates when fired</div>
                <div>After firing a piece of ammo, you can make a roll to try to recover it intact, but any unused ammo becomes inert when you rest</div>
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
                    <span>Add Ammo: </span><input type="text" ref={input}></input><button onClick={addCustomAmmo}>+</button>
                </div>
            </div>
        </div>
    )
}