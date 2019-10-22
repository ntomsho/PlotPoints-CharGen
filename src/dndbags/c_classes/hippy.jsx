import React, { useState } from 'react';
import { randomAnimal, MUTATIONS, random } from '../../dndb-tables';

export default function Hippy(props) {
    let { currentSpecials } = props;
    const [currentForm, setCurrentForm] = useState(null);
    const [currentMutation, setCurrentMutation] = useState(null);
    const input = React.createRef();

    if (!currentSpecials.forms) {
        createForms();
    }

    function createForms() {
        let forms = [];
        for (let i = 0; i < 3; i++) {
            forms.push(randomAnimal());
        };
        props.updateState('currentSpecials', { 'forms': forms });
    }

    function sacrificeForm(formInd) {
        setCurrentMutation(random(MUTATIONS));
        let newForms = currentSpecials.forms;
        newForms.splice(formInd, 1);
        props.updateState('currentSpecials', { 'forms': newForms })
    }

    function mutationDisp() {
        if (currentMutation) {
            return(
                <>
                <div>
                    <span>Mutation: </span><span>{currentMutation}</span>
                </div>
                <button onClick={() => setCurrentMutation(null)}>End Scene</button>
                </>
            )
        }
    }

    function addCustomForm() {
        let newForms = currentSpecials.forms;
        newForms.push(input.current.value);
        props.updateState('currentSpecials', {'forms': newForms})
    }

    function formsDisp() {
        if (currentSpecials.forms) {
            return (
                <ul sytle={{listStyle: 'none'}}>
                    {currentSpecials.forms.map((form, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div className={`form${currentForm === form ? ' selected' : ''}`}>{form} Form</div>
                                </li>
                                <button onClick={() => setCurrentForm(form)}>Choose Form</button>
                                <button onClick={() => sacrificeForm(i)}>Sacrifice Form</button>
                            </div>
                        )
                    })}
                    <div>
                        <li>
                            <div className={`form${currentForm === null ? ' selected' : ''}`}>Human Form</div>
                        </li>
                        <button onClick={() => setCurrentForm(null)}>Choose Form</button>
                    </div>
                </ul>
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
                {mutationDisp()}
                <div id="form-list">
                    {formsDisp()}
                </div>
                <div>
                    <button className="randomize-button" onClick={createForms}>Randomize Animal Forms</button>
                    <span>Add Animal Form: </span><input type="text" ref={input}></input><button onClick={addCustomForm}>+</button>
                </div>
            </div>
        </div>
    )
}