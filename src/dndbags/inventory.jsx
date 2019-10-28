import React, { useState, useEffect } from 'react';
import { random, EQUIPMENT, STARTING_ITEMS, WEAPONS, ELEMENTS, VERBS, GERUNDS, randomAnimal, randomMagicItem, SONGS, ELEMENTS_OF, BASES, FORMS } from '../dndb-tables';

export default function Inventory(props) {
    const [startingChoices, setStartingChoices] = useState([])

    useEffect(() => {
        if (props.cClass) {
            const itemPackage = STARTING_ITEMS[props.cClass]
            let startChoiceArr = [];
            for (let i = 0; i < itemPackage.length; i++) {
                if (itemPackage[i].length === 1) {
                    startChoiceArr.push(itemPackage[i][0])
                } else {
                    startChoiceArr.push(undefined)
                }
            }
            setStartingChoices(startChoiceArr)
        }
    }, [props.cClass])

    function startingEquipmentDisp() {
        if (props.cClass && JSON.stringify(props.inventory) === JSON.stringify(["", "", "", "", "", "", "", "", "", "", "", ""])) {
            const itemPackage = STARTING_ITEMS[props.cClass];
            return (
                <>
                <h3>Starting Inventory Choices</h3>
                <ul>
                    {itemPackage.map((choices, i) => {
                        return (
                            <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                            {choiceField(choices, i)}
                            </div>
                        )
                    })}
                </ul>
                <div>Plus {8 - itemPackage.length} standard items</div>
                <button 
                // disabled={startingChoices.length === itemPackage.length}
                onClick={createStartingInv}
                >
                    Accept
                </button>
                </>
            )
        }
    }

    function choiceField(choices, ind) {
        return (
            <>
            {choices.map((choice, i) => {
                return (
                    <div key={i} 
                    onClick={() => startingChoice(choice, ind)}
                    className={`starting-items-choice${startingChoices[ind] === choice ? ' selected' : ''}`}>
                        {choice}
                    </div>
                )
            })}
            </>
        )
    }

    function startingChoice(choice, ind) {
        let newChoices = startingChoices;
        newChoices[ind] = choice;
        setStartingChoices([...newChoices]);
    }

    function createStartingInv() {
        console.log(`createStartingInv`)
        let newInv = [];
        for (let i = 0; i < startingChoices.length; i++) {
            let item;
            switch(startingChoices[i]) {
                case "Melee Weapon":
                    item = random(WEAPONS.slice(0, 18));
                    break;
                case "Ranged Weapon":
                    item = random(WEAPONS.slice(19, 36));
                    break;
                case "Weapon Oil":
                    item = `${random(random([ELEMENTS, GERUNDS]))} Weapon Oil`;
                    break;
                case "Animal Totem":
                    item = `${randomAnimal()} Totem`;
                case "Magic Item":
                    item = randomMagicItem();
                    break;
                case "Songbook":
                    item = random([
                        `${random(SONGS)} of ${ELEMENTS_OF}`,
                        `${random(GERUNDS)} ${random(SONGS)}`
                    ]);
                    break;
                case "Magic Potion":
                    item = `${random(random([ELEMENTS, GERUNDS]))} Potion`;
                    break;
                case "2 Alchemical Ingredients":
                    item = `${random(BASES)} Base + ${random(random([ELEMENTS, VERBS]))} Catalyst`;
                    break;
                case "Scroll of Power":
                    item = `Scroll of ${random(random([ELEMENTS, GERUNDS, FORMS]))}`
                    break;
                default:
                    item = startingChoices[i];
            }
            newInv.push(item);
        }
        while (newInv.length < 8) {
            newInv.push(random(EQUIPMENT));
        }
        props.updateState('inventory', newInv);
    }

    function moveToStash(num) {
        if (props.inventory[num] === "") return;
        let newInventory = Object.assign({}, props.inventory);
        let freeSpace = false;
        for (let i = 3; i < 12; i++) {
            if (!props.inventory[i]) {
                newInventory[i] = props.inventory[num];
                newInventory[num] = "";
                freeSpace = true;
                break;
            }
        }
        if (freeSpace) props.updateState("inventory", newInventory);
    }

    function moveToCarried(num) {
        if (props.inventory[num] === "") return;
        let newInventory = Object.assign({}, props.inventory);
        let freeSpace = false;
        for (let i = 0; i < 3; i++) {
            if (!props.inventory[i]) {
                newInventory[i] = props.inventory[num];
                newInventory[num] = "";
                freeSpace = true;
                break;
            }
        }
        if (freeSpace) props.updateState("inventory", newInventory);
    }

    function handleChange(event) {
        let newInventory = props.inventory;
        newInventory[parseInt(event.target.name)] = event.target.value;
        props.updateState('inventory', newInventory);
    }

    return (
        <>
        <h2>Inventory</h2>
        {startingEquipmentDisp()}
        <h3>Carried Gear</h3>
        <div className="sheet-row">
            <input className="inventory-space" onChange={handleChange} name="0" type="text" id="carried-1" value={props.inventory[0] || ""}></input>
            <button onClick={() => moveToStash(0)}>Move to Stash</button>
            <input className="inventory-space" onChange={handleChange} name="1" type="text" id="carried-2" value={props.inventory[1] || ""}></input>
            <button onClick={() => moveToStash(1)}>Move to Stash</button>
            <input className="inventory-space" onChange={handleChange} name="2" type="text" id="carried-3" value={props.inventory[2] || ""}></input>
            <button onClick={() => moveToStash(2)}>Move to Stash</button>
        </div>
        <h3>Stashed Gear</h3>
        <div className="sheet-row">
            <input className="inventory-space" onChange={handleChange} name="3" type="text" id="stashed-1" value={props.inventory[3] || ""}></input>
            <button onClick={() => moveToCarried(3)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="4" type="text" id="stashed-2" value={props.inventory[4] || ""}></input>
            <button onClick={() => moveToCarried(4)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="5" type="text" id="stashed-3" value={props.inventory[5] || ""}></input>
            <button onClick={() => moveToCarried(5)}>Move to Carried</button>
        </div>
        <div className="sheet-row">
            <input className="inventory-space" onChange={handleChange} name="6" type="text" id="stashed-4" value={props.inventory[6] || ""}></input>
            <button onClick={() => moveToCarried(6)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="7" type="text" id="stashed-5" value={props.inventory[7] || ""}></input>
            <button onClick={() => moveToCarried(7)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="8" type="text" id="stashed-6" value={props.inventory[8] || ""}></input>
            <button onClick={() => moveToCarried(8)}>Move to Carried</button>
        </div>
        <div className="sheet-row">
            <input className="inventory-space" onChange={handleChange} name="9" type="text" id="stashed-7" value={props.inventory[9] || ""}></input>
            <button onClick={() => moveToCarried(9)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="10" type="text" id="stashed-8" value={props.inventory[10] || ""}></input>
            <button onClick={() => moveToCarried(10)}>Move to Carried</button>
            <input className="inventory-space" onChange={handleChange} name="11" type="text" id="stashed-9" value={props.inventory[11] || ""}></input>
            <button onClick={() => moveToCarried(11)}>Move to Carried</button>
        </div>
        </>
    )
}