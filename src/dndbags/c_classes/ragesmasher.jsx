import React, { useState } from 'react';
import { randomAnimal } from '../../dndb-tables';

export default function Ragesmasher(props) {
    const { currentSpecials } = props;
    const [raging, setRaging] = useState(false);
    const [rage, setRage] = useState(1);
    const input = React.createRef();

    function setTotem() {
        setRaging(false);
        props.updateState('currentSpecials', { 'totem': randomAnimal() })
    }

    function setCustomTotem() {
        setRaging(false);
        props.updateState('currentSpecials', { 'totem': input.current.value });
    }

    function rageOut(overRage) {
        if (rage > 0) {
            setRaging(true);
            if (!overRage) setRage(rage - 1)
            props.updateState('currentSpecials', { 'totem': "" })
        }
    }

    function setRageNum(num) {
        rage === num ? setRage(rage - 1) : setRage(num);
    }

    function totemDisp() {
        if (currentSpecials.totem) {
            return (
                <>
                    <div><strong>{currentSpecials.totem}</strong> Totem</div>
                    <button onClick={() => rageOut(false)}>Rage Out!</button>
                </>
            )
        }
    }

    function rageDisp() {
        return (
            <>
                <strong>RAGING!</strong>
                <span style={{fontWeight: 'normal', fontFamily: 'auto', fontSize: '2.5vw'}}>Gain Magic Advantage on all rolls to fight, smash, punch, or break stuff<br/>Take +1 Difficulty on anything else</span>
                <button onClick={() => setRaging(false)}>End Rage</button>
            </>
        )
    }

    function rageOverflow() {
        if (rage >= 3) {
            return (
                <button onClick={() => rageOut(true)}>Rage Overflow</button>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A primal barbarian warrior who channels animal spirits when they aren’t flipping out.</div>
                <br />
                <div className="ability-desc">
                    {/* This is a mess, fix */}
                    <div>Magic Ability:<br /><strong>Animal Totems and Barbaric Rage</strong></div>
                    <div>You can channel one Animal Totem at a time to gain Magic Advantage on any action associated with that animal.</div>
                    <div>You can spend a point of Rage to Rage Out, losing your Totem for the rest of the scene (roll a new one next scene), but gaining Magic Advantage on all rolls to fight, smash, or break stuff, but taking +1 Difficulty on anything else.</div>
                    <div>If your Rage would go above 3, you automatically Rage Out instead of gaining the point. You gain Rage whenever you:</div>
                    <ul>
                        <li>Take Damage</li>
                        <li>Are made particularly mad by something</li>
                    </ul>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {raging ? rageDisp() : totemDisp()}
                        <div id="rage-counter">
                            <div>Rage</div>
                            <button onClick={() => setRageNum(1)}>{rage >= 1 ? "⦿" : "⦾"}</button>
                            <button onClick={() => setRageNum(2)}>{rage >= 2 ? "⦿" : "⦾"}</button>
                            <button onClick={() => setRageNum(3)}>{rage >= 3 ? "⦿" : "⦾"}</button>
                            {rageOverflow()}
                        </div>
                    </div>
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Change Totem: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input}></input><button onClick={setCustomTotem}>+</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={setTotem}>Randomize Totem</button>
                </div>
            </div>
        </div>
    )
}