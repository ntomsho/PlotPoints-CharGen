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
                <button onClick={consumeCurrentConcoction}>Use</button>
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
                    bases[selectedBase] + " of " + ELEMENTS_OF[ELEMENTS.indexOf(catalysts[selectedCatalyst].comp)]
                ])
            }
        }
        else {
            return ""
        }
    }
    
    function componentsList() {
        if (bases && catalysts && bases.length > 0 && catalysts.length > 0) {
            return (
                <>
                <div>
                    <h3>Bases</h3>
                    <ul className="resource-list">
                        {bases.map((b, i) => {
                            return (
                                <li key={i} className="resource-list-entry">
                                    <div className={`comp${selectedBase === i ? ' selected' : ''}`} onClick={() => setSelectedBase(selectedBase === i ? null : i)}>{b}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h3>Catalysts</h3>
                    <ul className="resource-list">
                        {catalysts.map((c, i) => {
                            return (
                                <li key={i} className="resource-list-entry">
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
                <div className="class-desc">An alchemist and apothecary who can craft a variety of useful concoctions.</div>
                <br />
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br /><strong>Alchemical Concoctions</strong></div>
                        <div>You carry with you a supply of 5 alchemical Bases and 5 Catalysts with you that inexplicably replenishes itself when you rest.</div>
                        <div>Combine a Base and a Catalyst to create a Concoction you can use immediately.</div>
                        <br/>
                        <div>Resource Item:<br/><strong>Alchemical Ingredients</strong></div>
                        <div>Spend an alchemical ingredient to add it your current lists of Bases or Catalysts.</div>
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    <div>
                        {currentConcoctionDisp()}
                    </div>
                    {consumeButton()}
                </div>
                {/* <div className="components-list"> */}
                <div style={{display: 'flex'}}>
                    {componentsList()}
                </div>
                <div>
                    <div className="ability-management-container">
                        <div className="custom-add-row">
                            <div>Add Base: </div>
                            <div className="custom-add-field">
                                <select ref={input1}>
                                    {BASES.map((base, i) => {
                                        return (
                                            <option key={i} value={base}>{base}</option>
                                            )
                                        })}
                                </select>
                                <button onClick={() => addCustomComponent('base')}>+</button>
                            </div>
                        </div>
                        <br/>
                        <div className="custom-add-row">
                            <div>Add Catalyst: </div>
                            <div className="custom-add-field">
                                <input style={{width: '30vw'}} type="text" ref={input2}></input>
                                <select ref={input3}>
                                    <option value="Form">Form</option>
                                    <option value="Element">Element</option>
                                    <option value="Verb">Verb</option>
                                </select>
                                <button onClick={() => addCustomComponent('catalyst')}>+</button>
                            </div>
                        </div>
                        <button className="ability-randomize-button" onClick={() => createComponents()}>Generate New Components<br/>(On rest)</button>
                    </div>
                </div>
            </div>
        </div>
    )
}