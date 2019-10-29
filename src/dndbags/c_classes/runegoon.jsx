import React, { useState } from 'react';
import { random, RUNES, VERBS, ELEMENTS } from '../../dndb-tables';

export default function Runegoon(props) {
    const { currentSpecials } = props;
    const [activeRunes, setActiveRunes] = useState([]);
    const input = React.createRef();

    if (!currentSpecials.runes) {
        props.updateState('currentSpecials', { 'runes': [] });
    }

    function randomRune() {
        return {'rune': random(RUNES), 'word': random(random([VERBS, ELEMENTS]))};
    }

    function addCustomRune() {
        let newRunes = currentSpecials.runes;
        newRunes.push({'rune': random(RUNES), 'word': input.current.value});
        props.updateState('currentSpecials', { 'runes': newRunes })
    }

    function createRunes() {
        let runes = [];
        for(let i = 0; i < 4; i++) {
            runes.push(randomRune());
        }
        props.updateState('currentSpecials', {'runes': runes})
    }

    function activateRune(runeInd) {
        let newRunes = currentSpecials.runes;
        let newActiveRunes = activeRunes
        activeRunes.push(currentSpecials.runes[runeInd]);
        newRunes.splice(runeInd, 1);
        setActiveRunes(newActiveRunes);
        props.updateState('currentSpecials', {'runes': newRunes});
    }

    function runesDisp() {
        if (currentSpecials.runes) {
            return (
                <ul className="resource-list">
                    {currentSpecials.runes.map((r, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div><strong>{r.word}</strong></div>
                                <button onClick={() => activateRune(i)}><strong>{r.rune}</strong></button>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    function activeRunesDisp() {
        if (activeRunes.length > 0) {
            return (
                <>
                <h3>Active Runes</h3>
                <ul className="resource-list">
                    {activeRunes.map((r, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div>{r.rune} <strong>{r.word}</strong> on <input className="rune-on-input" type='text' /></div>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={() => setActiveRunes([])}>End Scene</button>
                </>
            )
        }
    }
    
    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A crafter of magical runes that invoke an ancient arcane language.</div>
                <br />
                <div className="ability-desc">
                    <div>Magic Ability:<br /><strong>Arcane Runes</strong></div>
                    <div>Whenever you rest, you gain access to a set of four ancient runes. You can activate any of them by writing, painting, or inscribing the associated rune onto something.</div>
                    <div>Whatever you draw the rune on is infused with the properties of the runic word for the rest of the scene.</div>
                </div>
            </div>
            <div className="class-ability-display">
                {/* <div id="rune-lists" style={{display: 'flex', flexDirection: 'column'}}> */}
                <div className="resource-lists-container">
                    <div id="active-runes">
                        {activeRunesDisp()}
                    </div>
                    <div id="current-runes">
                        {runesDisp()}
                    </div>
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Rune: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input}></input><button onClick={addCustomRune}>+</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createRunes}>Generate Random Runes</button>
                </div>
            </div>
        </div>
    )
}