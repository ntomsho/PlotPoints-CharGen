import React from 'react';
import { randomAnimal, random, MUTATIONS } from '../../dndb-tables';

export default function Zoomaster(props) {
    const { currentSpecials } = props;

    function createNewCompanion() {
        props.updateState('currentSpecials', { 'companion': randomAnimal(), 'mutation': random(MUTATIONS) })
    }

    function randomCompanion() {
        props.updateState('currentSpecials', { 'companion': randomAnimal(), 'mutation': currentSpecials.mutation })
    }

    function randomMutation() {
        props.updateState('currentSpecials', { 'companion': currentSpecials.companion, 'mutation': random(MUTATIONS) })
    }

    function handleCompanionChange(e) {
        props.updateState('currentSpecials', { 'companion': e.target.value, 'mutation': currentSpecials.mutation })
    }

    function handleMutationChange(e) {
        props.updateState('currentSpecials', { 'companion': currentSpecials.companion, 'mutation': e.target.value })
    }

    function companionDisp() {
        if (currentSpecials.companion || currentSpecials.mutation) {
            return (
                <div style={{display: 'flex'}}>
                    <div className="zoomaster-ability-section">
                        Mutation
                        <input type="text" onChange={handleMutationChange} value={props.currentSpecials.mutation} />
                        <button onClick={() => randomMutation()}>Randomize Mutation</button>
                    </div>
                    <div className="zoomaster-ability-section">
                        Animal
                        <input type="text" onChange={handleCompanionChange} value={props.currentSpecials.companion} />
                        <button onClick={() => randomCompanion()}>Randomize Animal</button>
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A tamer of beasts with a shapeshifting chimera as an animal companion.</div>
                <br />
                <div>Magic Ability:<br /><strong>Chimeric Companion</strong></div>
                <div>Your best friend is a Chimera that shifts between the shapes of various creatures. Whenever you rest, it assumes a new animal form and mutation.</div>
                <div>If you feed your Chimera a hearty meal of whatever its current form eat, you can change its mutation, animal form, or both.</div>
                <div>You and your Chimera share Health. Any damage or healing done to one of you is done to the other.</div>
            </div>
            <div className="class-ability-display">
                {companionDisp()}
                <div>
                    <button className="randomize-button" onClick={createNewCompanion}>Randomize Companion</button>
                </div>
            </div>
        </div>
    )
}