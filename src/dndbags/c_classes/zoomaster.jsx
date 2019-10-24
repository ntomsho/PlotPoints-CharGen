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
                {companionDisp()}
                <div>
                    <button className="randomize-button" onClick={createNewCompanion}>Randomize Companion</button>
                </div>
            </div>
        </div>
    )
}