import React, {useState} from 'react';
import { randomAnimal, random, MUTATIONS } from '../../dndb-tables';

export default function Zoomaster(props) {
    const { currentSpecials } = props;
    const [currentForm, setCurrentForm] = useState(null);
    const input1 = React.createRef();
    const input2 = React.createRef();
    const input3 = React.createRef();

    if (!currentSpecials.naturalForms) {
        props.updateState('currentSpecials', { 'naturalForms': [], 'chimericForms': [] })
    }

    function randomNaturalForm() {
        return randomAnimal();
    }

    function randomChimericForm() {
        return {'mutation': random(MUTATIONS), 'animal': randomAnimal()};
    }

    function createForms() {
        let naturals = [];
        let chimerics = [];
        for (let i = 0; i < 3; i++) {
            naturals.push(randomNaturalForm());
            chimerics.push(randomChimericForm());
        }
        chimerics.push(randomChimericForm());
        props.updateState('currentSpecials', { 'naturalForms': naturals, 'chimericForms': chimerics });
    }

    function addCustomForm(randomize, natural) {
        let newForms = currentSpecials;
        natural ? 
            newForms.naturalForms.push(randomize ? randomNaturalForm() : input1.current.value) : 
            newForms.chimericForms.push(randomize ? randomChimericForm() : {'mutation': input3.current.value, 'animal': input2.current.value})
        props.updateState('currentSpecials', newForms);
    }

    function setChimericForm(formIndex) {
        let newForms = currentSpecials;
        const newForm = currentSpecials.chimericForms[formIndex]
        setCurrentForm({'formType': 'chimeric', 'form': newForm.animal + " with " + newForm.mutation });
        newForms.chimericForms.splice(formIndex, 1);
        props.updateState('currentSpecials', newForms);
    }

    function currentFormDisp() {
        if (currentForm) {
            let endSceneButton;
            let formName;
            if (currentForm.formType === 'chimeric') {
                endSceneButton = <button onClick={() => setCurrentForm(null)}>End Scene</button>
                formName = currentForm.form;
            } else {
                formName = currentSpecials.naturalForms[currentForm.index]
            }
                
            return (
                <>
                <div>
                    Current Form: <strong>{formName}</strong>
                </div>
                {endSceneButton}
                </>
            )
        }
    }

    function naturalFormsDisp() {
        if (currentSpecials.naturalForms && currentSpecials.naturalForms.length > 0) {
            return (
                <>
                <h3>Natural Forms</h3>
                <ul className="resource-list">
                    {currentSpecials.naturalForms.map((form, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div onClick={() => setCurrentForm({ 'formType': 'natural', 'index': i })} className={`form${currentForm === form ? ' selected' : ''}`}>
                                    <strong>{form}</strong>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                </>
            )
        }
    }

    function chimericFormsDisp() {
        if (currentSpecials.chimericForms && currentSpecials.chimericForms.length > 0) {
            return (
                <>
                    <h3>Natural Forms</h3>
                    <ul className="resource-list">
                        {currentSpecials.chimericForms.map((form, i) => {
                            return (
                                <li key={i} className="resource-list-entry">
                                    <div>
                                        <strong>{form.animal} with {form.mutation}</strong>
                                    </div>
                                    <button onClick={() => setChimericForm(i)}>Use</button>
                                </li>
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
                <div className="class-desc">A tamer of beasts with a shapeshifting chimera as an animal companion.</div>
                <br />
                <div className="ability-desc">
                    <div className="ability-desc-scrollbox">
                        <div>Magic Ability:<br /><strong>Chimeric Companion</strong></div>
                        <div>Your best friend is a Chimera that shifts between the shapes of various creatures. Whenever you rest, it assumes a new animal form and mutation.</div>
                        <div>Whenever you rest, it generates a set of 3 natural forms it can shift between at will, and 4 chimeric forms.</div>
                        <div>You can spend a chimeric form to turn your companion into that creature for the duration of the scene, afterwhich it must return to one of its natural forms.</div>
                        <div>You and your Chimera share Health. Any damage or healing done to one of you is done to the other.</div>
                        <br />
                        <div>Resource Item:<br/><strong></strong></div>
                        <div>Spend an Animal Totem to add a Chimeric Form with its animal type and mutation to your current list.</div>
                    </div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {currentFormDisp()}
                </div>
                <div className="resource-lists-container" id="form-list">
                    <div id="chimerics-display">
                        {chimericFormsDisp()}
                    </div>
                    <div id="naturals-display">
                        {naturalFormsDisp()}
                    </div>
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Natural Form: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input1}></input>
                            <button onClick={() => addCustomForm(false, true)}>+</button>
                            <button onClick={() => addCustomForm(true, true)}>🎲</button>
                        </div>
                    </div>
                    <div className="custom-add-row">
                        <div>Add Chimeric Form: </div>
                        <div className="custom-add-field">
                            <span>Base Animal</span>
                            <input type="text" ref={input2}></input>
                            <span>Mutation</span>
                            <input type="text" ref={input3}></input>
                            <button onClick={() => addCustomForm(false, false)}>+</button>
                            <button onClick={() => addCustomForm(true, false)}>🎲</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createForms}>Generate New Forms<br />(On rest)</button>
                </div>
            </div>
        </div>
    )
}