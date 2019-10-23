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
                <ul style={{ listStyle: 'none' }}>
                    {currentSpecials.runes.map((r, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div><strong>{r.rune}</strong>{r.word}</div>
                                </li>
                                <button onClick={() => activateRune(i)}>Inscribe</button>
                            </div>
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
                <ul style={{ listStyle: 'none' }}>
                    {activeRunes.map((r, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div><strong>{r.rune}</strong>{r.word} on <input type='text' /></div>
                                </li>
                            </div>
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
                <div id="rune-lists" style={{display: 'flex', flexDirection: 'column'}}>
                    <div id="active-runes">
                        {activeRunesDisp()}
                    </div>
                    <div id="current-runes">
                        {runesDisp()}
                    </div>
                </div>
                <div>
                    <button className="randomize-button" onClick={createRunes}>Generate Random Runes</button>
                    <span>Add Rune: </span><input type="text" ref={input}></input><button onClick={addCustomRune}>+</button>
                </div>
            </div>
        </div>
    )
}