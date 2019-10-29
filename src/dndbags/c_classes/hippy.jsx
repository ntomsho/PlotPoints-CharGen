import React, { useState } from 'react';
import { randomAnimal, MUTATIONS, random } from '../../dndb-tables';

export default function Hippy(props) {
    const { currentSpecials } = props;
    const [currentForm, setCurrentForm] = useState(null);
    const [currentMutation, setCurrentMutation] = useState(null);
    const input = React.createRef();

    if (!currentSpecials.forms) {
        props.updateState('currentSpecials', { 'forms': [] })
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
                    Mutation: {currentMutation}
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
                <ul className="resource-list">
                    {currentSpecials.forms.map((form, i) => {
                        return (
                                <li key={i} className="resource-list-entry">
                                <div onClick={() => setCurrentForm(form)} className={`form${currentForm === form ? ' selected' : ''}`}><strong>{form}</strong> Form</div>
                                    <button onClick={() => sacrificeForm(i)}>X</button>
                                </li>
                        )
                    })}
                    <div>
                        <li className="resource-list-entry">
                            <div onClick={() => setCurrentForm(null)} className={`form${currentForm === null ? ' selected' : ''}`}><strong>Human</strong> Form</div>
                        </li>
                    </div>
                </ul>
            )
        }
    }
    
    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A totally chill master of nature who can shapeshift into animals.</div>
                <br />
                <div className="ability-desc">
                    <div>Magic Ability:<br /><strong>Animal Forms</strong></div>
                    <div>Whenever you rest, you are given a set of three animal forms that you can shift in and out of at will. When in an animal form, you gain Magic Advantage on any actions the form is well suited for.</div>
                    <div>You can give up one of your forms to add a mutation that applies to any other form (including your base form) for the rest of the scene.</div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {mutationDisp()}
                </div>
                <div className="resource-lists-container" id="form-list">
                    {formsDisp()}
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Animal Form: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input}></input><button onClick={addCustomForm}>+</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createForms}>Generate Animal Forms<br/>(On rest)</button>
                </div>
            </div>
        </div>
    )
}