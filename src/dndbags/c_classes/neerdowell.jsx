import React from 'react';
import { randomMagicItem } from '../../dndb-tables';

export default function Neerdowell(props) {
    const { currentSpecials } = props;
    const input = React.createRef();

    if (!currentSpecials.items) {
        props.updateState('currentSpecials', { 'items': [] })
    }

    function createItems() {
        let items = [];
        for (let i = 0; i < 5; i++) {
            items.push(randomMagicItem());
        };
        props.updateState('currentSpecials', { 'items': items })
    }

    function consumeItem(itemInd) {
        let newItems = currentSpecials.items;
        newItems.splice(itemInd, 1);
        props.updateState('currentSpecials', { 'items': newItems });
    }

    function addCustomItem() {
        let newItems = currentSpecials.items;
        newItems.push(input.current.value);
        props.updateState('currentSpecials', { 'items': newItems })
    }

    function itemsDisp() {
        if (currentSpecials.items) {
            return (
                <ul style={{ listStyle: 'none' }}>
                    {currentSpecials.items.map((item, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div>{item}</div>
                                </li>
                                <button onClick={() => consumeItem(i)}>Use</button>
                            </div>
                        )
                    })}
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
                <div id="item-list">
                    {itemsDisp()}
                </div>
                <div>
                    <button className="randomize-button" onClick={createItems}>Generate Random Items</button>
                    <span>Add Item: </span><input type="text" ref={input}></input><button onClick={addCustomItem}>+</button>
                </div>
            </div>
        </div>
    )
}