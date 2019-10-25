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
                <div className="class-desc">A totally chill master of nature who can shapeshift into animals.</div>
                <br />
                <div>Magic Ability:<br /><strong>Animal Forms</strong></div>
                <div>Whenever you rest, you are given a set of three animal forms that you can shift in and out of at will. When in an animal form, you gain Magic Advantage on any actions the form is well suited for.</div>
                <div>You can give up one of your forms to add a mutation that applies to any other form (including your base form) for the rest of the scene.</div>
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