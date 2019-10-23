import React, { useState } from 'react';
import { random, BASES, GERUNDS, ELEMENTS, ELEMENTS_OF } from '../../dndb-tables';

export default function Mixologist(props) {
    let { currentSpecials } = props;
    let { bases, catalysts } = currentSpecials;

    //currentConcoction[0] === base;
    //currentConcoction[1] === catalyst;
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedCatalyst, setSelectedCatalyst] = useState(null);

    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();

    if (!currentSpecials.bases && !currentSpecials.catalysts) {
        props.updateState('currentSpecials', { 'bases': [], 'catalysts': [] });
    }

    function randomBase() {
        return random(BASES);
    }

    function randomCatalyst() {
        return random([
            {'comp': `${random(GERUNDS)}`, 'compCat': 'verb'},
            {'comp': `${random(ELEMENTS)}`, 'compCat': 'element'}
        ]);
    }

    function createComponents() {
        let newBases = [];
        let newCatalysts = [];
        for(let i = 0; i < 5; i++) {
            newBases.push(randomBase());
            newCatalysts.push(randomCatalyst());
        }
        props.updateState('currentSpecials', { 'bases': newBases, 'catalysts': newCatalysts });
    }

    function addCustomComponent(compCat) {
        if (compCat === "base") {
            let newBases = bases;
            newBases.push(input1.current.value);
            props.updateState('currentSpecials', { 'bases': newBases, 'catalysts': catalysts });
        } else {
            let newCatalysts = catalysts;
            newCatalysts.push({'comp': input2.current.value, 'compCat': input3.current.value});
            props.updateState('currentSpecials', { 'bases': bases, 'catalysts': newCatalysts });
        }
    }

    function consumeCurrentConcoction() {
        const newBases = bases
        newBases.splice(selectedBase, 1);
        const newCatalysts = catalysts
        newCatalysts.splice(selectedCatalyst, 1);
        setSelectedBase(null);
        setSelectedCatalyst(null);
        props.updateState('currentSpecials', { 'bases': newBases, 'catalysts': newCatalysts });
    }

    function consumeButton() {
        if (selectedBase !== null && selectedCatalyst !== null) {
            return (
                <button onClick={consumeCurrentConcoction}>Use Concoction</button>
            )
        }
    }

    function currentConcoctionDisp() {
        if (selectedBase !== null && selectedCatalyst === null) {
            return bases[selectedBase];
        } else if (selectedBase === null && selectedCatalyst !== null) {
            return catalysts[selectedCatalyst].comp;
        } else if (selectedBase !== null && selectedCatalyst !== null) {
            if (catalysts[selectedCatalyst].compCat === 'verb') {
                return catalysts[selectedCatalyst].comp + " " + bases[selectedBase];
            } else {
                return random([
                    catalysts[selectedCatalyst].comp + " " + bases[selectedBase],
                    bases[selectedBase] + " of " + ELEMENTS_OF[ELEMENTS_OF.indexOf(catalysts[selectedCatalyst].comp)]
                ])
            }
        }
        else {
            return ""
        }
    }
    
    function componentsList() {
        if (bases && catalysts) {
            return (
                <>
                <div>
                    <h3>Bases</h3>
                    <ul style={{listStyle: 'none'}}>
                        {bases.map((b, i) => {
                            return (
                                <li key={i}>
                                    <div className={`comp${selectedBase === i ? ' selected' : ''}`} onClick={() => setSelectedBase(selectedBase === i ? null : i)}>{b}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h3>Catalysts</h3>
                    <ul style={{ listStyle: 'none' }}>
                        {catalysts.map((c, i) => {
                            return (
                                <li key={i}>
                                    <div className={`comp${selectedCatalyst === i ? ' selected' : ''}`} onClick={() => setSelectedCatalyst(selectedCatalyst === i ? null : i)}>{c.comp}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
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
                <div className="ability-main">
                    {currentConcoctionDisp()}
                    {consumeButton()}
                </div>
                <div className="components-list">
                    {componentsList()}
                </div>
                <div>
                    <button className="randomize-button" onClick={() => createComponents()}>Generate New Components</button>
                    <div>
                        <span>Add Base: </span>
                        <select ref={input1}>
                            {BASES.map((base, i) => {
                                return (
                                    <option key={i} value={base}>{base}</option>
                                )
                            })}
                        </select>
                        <button onClick={() => addCustomComponent('base')}>+</button>
                        <span>Add Catalyst: </span>
                        <input type="text" ref={input2}></input>
                        <select ref={input3}>
                            <option value="Form">Form</option>
                            <option value="Element">Element</option>
                            <option value="Verb">Verb</option>
                        </select>
                        <button onClick={() => addCustomComponent('catalyst')}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}