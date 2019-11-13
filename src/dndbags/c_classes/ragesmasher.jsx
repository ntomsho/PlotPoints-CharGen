import React, { useState } from 'react';
import { randomAnimal } from '../../dndb-tables';

export default function Ragesmasher(props) {
    const { currentSpecials } = props;
    const [raging, setRaging] = useState(false);
    const [rage, setRage] = useState(1);
    const [totemLost, setTotemLost] = useState(true);
    const input = React.createRef();

    if (!currentSpecials.totems) {
        props.updateState('currentSpecials', { 'totems': [] })
    }

    function createTotems() {
        let totems = [];
        while (totems.length < 3) {
            totems.push(randomAnimal());
        };
        props.updateState('currentSpecials', { 'totems': totems })
    }

    function addCustomTotem(randomize) {
        let newTotems = currentSpecials.totems;
        newTotems.push(randomize ? randomAnimal() : input.current.value);
        props.updateState('currentSpecials', { 'totems': newTotems });
    }

    function setRageNum(num) {
        let newRage = rage;
        newRage === num ? newRage = (rage - 1) : newRage = (num);
        if (newRage === 3) {
            setRaging(true);
            setTotemLost(false);
        }
        setRage(newRage);
     }

    function rageOut(totemInd) {
        if (raging) {
            setTotemLost(true);
        } else {
            setRaging(true);
        }
        let newTotems = currentSpecials.totems;
        newTotems.splice(totemInd, 1);
        props.updateState('currentSpecials', { 'totems': newTotems });
    }

    function endRage() {
        setRage(0);
        setRaging(false);
    }

    function totemsDisp() {
        if (currentSpecials.totems && currentSpecials.totems.length > 0) {
            return (
                <ul className="resource-list">
                    {currentSpecials.totems.map((totem, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div><strong>{totem}</strong> Totem</div>
                                <button onClick={() => rageOut(i)}>X</button>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    function rageDisp() {
        let endRageButton = <button onClick={endRage}>End Scene</button>
        let endRageInfo = <div style={{fontWeight: 'normal', fontSize: '2.5vw'}}>Lose a totem, Rage ends at end of scene</div>
        return (
            <>
                <strong>RAGING!</strong>
                <div style={{fontWeight: 'normal', fontFamily: 'auto', fontSize: '2.5vw'}}>Gain Magic Advantage on all rolls to fight, smash, punch, or break stuff<br/>Take +1 Difficulty on anything else</div>
                {totemLost ? endRageButton : endRageInfo}
            </>
        )
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A primal barbarian warrior who channels animal spirits when they aren’t flipping out.</div>
                <br />
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br /><strong>Totem Spirits and Barbaric Rage</strong></div>
                        <div>Whenever you rest, you have a set of three Totem Spirits. You gain Magic Advantage on any action associated with one of those animals.</div>
                        <div>You gain a point of Rage whenever you take a Consequence. You can also take a point of Rage to gain Magic Advantage on an aggressive or destructive action.</div>
                        <div>Whenever your Rage reaches 3, you Rage Out, losing a Totem and gaining Magic Advantage on aggressive or destructive actions and +1 Difficulty on any other actions for the duration fo the scene.</div>
                        <div>At the end of every scene, your Rage goes back to 0.</div>
                        <br/>
                        <div>Resource Item:<br/><strong>Animal Totems</strong></div>
                        <div>Spend an Animal Totem to gain a Totem Spirit of its animal type.</div>
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {raging ? rageDisp() : null}
                        <div id="rage-counter">
                            <div>Rage</div>
                            <div className="class-radio-container">
                                <button onClick={() => setRageNum(1)}>{rage >= 1 ? "⦿" : "⦾"}</button>
                                <button onClick={() => setRageNum(2)}>{rage >= 2 ? "⦿" : "⦾"}</button>
                                <button onClick={() => setRageNum(3)}>{rage >= 3 ? "⦿" : "⦾"}</button>
                            </div>
                            <button onClick={() => setRageNum(0)}>Clear Rage</button>
                        </div>
                    </div>
                </div>
                <div className="resource-lists-container">
                    {totemsDisp()}
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Totem Spirit: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input}></input>
                            <button onClick={() => addCustomTotem(false)}>+</button>
                            <button onClick={() => addCustomTotem(true)}>🎲</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createTotems}>Generate Random Totems<br/>(On rest)</button>
                </div>
            </div>
        </div>
    )
}