import React, {useState} from 'react';
import { EQUIPMENT, WEAPONS, STARTING_ITEMS, random, randomMagicItem, randomResourceItem } from '../../dndb-tables';

export default function CharGenEquipment(props) {
    const itemPackage = STARTING_ITEMS[props.cClass];
    const [startingChoices, setStartingChoices] = useState(new Array)
    const [startingChoicesMade, setStartingChoicesMade] = useState(false);
    
    function createStartingInv() {
        let newInv = startingChoices;
        let standardItems = [];
        for (let i = 0; i < 8 - itemPackage.length; i++) {
            standardItems.push(random(EQUIPMENT));
        }
        newInv = newInv.concat(standardItems);
        while (newInv.length < 12) {
            newInv.push("");
        }
        setStartingChoicesMade(true);
        props.updateState("inventory", newInv);
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

    function typeSpace() {
        let newInv = props.inventory;
        newInv[parseInt(event.target.name)] = event.target.value;
        props.updateState('inventory', newInv);
    }

    function randomizeSpace(index, reroll) {
        let newInv = props.inventory;
        switch (startingChoices[i]) {
            case "Melee Weapon":
                newInv[index] = random(WEAPONS.slice(0, 18));
                break;
            case "Ranged Weapon":
                newInv[index] = random(WEAPONS.slice(19, 36));
                break;
            case "Weapon Oil":
            case "Animal Totem":
            case "Songbook":
            case "2 Alchemical Ingredients":
            case "Scroll of Power":
            case "Holy Symbol":
                newInv[index] = randomResourceItem(startingChoices[i])
                break;
            case "Magic Item":
                newInv[index] = randomMagicItem();
                break;
            default:
                newInv[index] = random(EQUIPMENT);
        }
        props.updateSelection("inventory", newInv, reroll);
    }

    function finalEquipmentDisp() {
        return (
            <div>
                {props.inventory.map((inv, i) => {
                    return (
                        <div key={i}>
                            <input onChange={typeSpace} name={i} type="text" value={props.inventory[i]}></input>
                            <button onClick={() => randomizeSpace(i, true)}>Reroll</button>
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