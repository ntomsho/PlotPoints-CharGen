import React, {useState} from 'react';
import { EQUIPMENT, WEAPONS, STARTING_ITEMS, random, randomMagicItem, randomResourceItem } from '../../dndb-tables';

export default function CharGenEquipment(props) {
    const itemPackage = STARTING_ITEMS[props.cClass];
    const [startingChoices, setStartingChoices] = useState(new Array)
    const [startingChoicesMade, setStartingChoicesMade] = useState(false);
    
    const randomRequired = ["Melee Weapon", "Ranged Weapon", "Weapon Oil", "Animal Totem", "Scroll of Power", "Command Scroll", "Songbook", "Holy Symbol", "Alchemical Ingredient"];

    function createStartingInv() {
        let newInv = startingChoices;
        let standardItems = [];
        for (let i = 0; i < 8 - itemPackage.length; i++) {
            standardItems.push(random(EQUIPMENT));
        }
        newInv = newInv.concat(standardItems);
        setStartingChoicesMade(true);
        for (let i = 0; i < startingChoices.length; i++) {
            if (randomRequired.includes(newInv[i])) newInv[i] = randomizeItem(i);
        }
        props.updateSelection("inventory", newInv);
    }
    
    function startingEquipmentDisp() {
        if (props.cClass && JSON.stringify(props.inventory) === JSON.stringify(["", "", "", "", "", "", "", "", "", "", "", ""])) {
            return (
                <>
                    <ul>
                        {itemPackage.map((choices, i) => {
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                    {choiceField(choices, i)}
                                </div>
                            )
                        })}
                    </ul>
                    <button
                        className="accept-button"
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

    function typeSpace(event) {
        let newInv = props.inventory;
        newInv[parseInt(event.target.name)] = event.target.value;
        props.updateSelection('inventory', newInv);
    }

    function randomizeSpace(index, reroll) {
        let newInv = props.inventory;
        newInv[index] = randomizeItem(index);
        props.updateSelection('inventory', newInv, reroll);
    }

    function randomizeItem(index) {
        switch (startingChoices[index]) {
            case "Melee Weapon":
                return random(WEAPONS.slice(0, 18));
                break;
            case "Ranged Weapon":
                return random(WEAPONS.slice(19, 36));
                break;
            case "Weapon Oil":
            case "Animal Totem":
            case "Songbook":
            case "Command Scroll":
            case "Scroll of Power":
            case "Holy Symbol":
            case "Alchemical Ingredient":
                return randomResourceItem(startingChoices[index])
                break;
            case "Magic Item":
                return randomMagicItem();
                break;
            default:
                return random(EQUIPMENT);
        }
        return 
    }

    function rerollButton(i) {
        if (randomRequired.includes(startingChoices[i])) {
            return <button onClick={() => randomizeSpace(i, true)}>Reroll {startingChoices[i]}</button>
        } else if (i >= itemPackage.length) {
            return <button onClick={() => randomizeSpace(i, true)}>Reroll Equipment</button>
        }
    }

    function finalEquipmentDisp() {
        return (
            <div>
                {props.inventory.slice(0,8).map((inv, i) => {
                    return (
                        <div key={i}>
                            <input onChange={typeSpace} name={i} type="text" value={props.inventory[i]}></input>
                            {rerollButton(i)}
                        </div>
                    )
                })}
            </div>
        )
    }

    if (startingChoicesMade) {
        return finalEquipmentDisp()
    } else {
        return startingEquipmentDisp()
    }
}