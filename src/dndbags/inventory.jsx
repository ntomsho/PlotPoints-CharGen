import React from 'react';
import { random, EQUIPMENT } from '../dndb-tables';

export default function Inventory(props) {

    function randomizeInventory() {
        let count = 0;
        let newInventory = Object.assign({}, props.inventory);
        for (let i = 3; count < 6 && i < 12; i++) {
            if (!props.inventory[i]) {
                newInventory[i] = random(EQUIPMENT);
                count += 1;
                console.log(count);
            }
        }
        props.updateState("inventory", newInventory);
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

    return (
        <>
        <h2>Inventory</h2>
        <button onClick={randomizeInventory}>Randomize Inventory</button>
        <h3>Carried Gear</h3>
        <div className="sheet-row">
            <input className="inventory-space" type="text" id="carried-1" defaultValue={props.inventory[0] || ""}></input>
            <button onClick={() => moveToStash(0)}>Move to Stash</button>
            <input className="inventory-space" type="text" id="carried-2" defaultValue={props.inventory[1] || ""}></input>
            <button onClick={() => moveToStash(1)}>Move to Stash</button>
            <input className="inventory-space" type="text" id="carried-3" defaultValue={props.inventory[2] || ""}></input>
            <button onClick={() => moveToStash(2)}>Move to Stash</button>
        </div>
        <h3>Stashed Gear</h3>
        <div className="sheet-row">
            <input className="inventory-space" type="text" id="stashed-1" defaultValue={props.inventory[3] || ""}></input>
            <button onClick={() => moveToCarried(3)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-2" defaultValue={props.inventory[4] || ""}></input>
            <button onClick={() => moveToCarried(4)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-3" defaultValue={props.inventory[5] || ""}></input>
            <button onClick={() => moveToCarried(5)}>Move to Carried</button>
        </div>
        <div className="sheet-row">
            <input className="inventory-space" type="text" id="stashed-4" defaultValue={props.inventory[6] || ""}></input>
            <button onClick={() => moveToCarried(6)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-5" defaultValue={props.inventory[7] || ""}></input>
            <button onClick={() => moveToCarried(7)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-6" defaultValue={props.inventory[8] || ""}></input>
            <button onClick={() => moveToCarried(8)}>Move to Carried</button>
        </div>
        <div className="sheet-row">
            <input className="inventory-space" type="text" id="stashed-7" defaultValue={props.inventory[9] || ""}></input>
            <button onClick={() => moveToCarried(9)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-8" defaultValue={props.inventory[10] || ""}></input>
            <button onClick={() => moveToCarried(10)}>Move to Carried</button>
            <input className="inventory-space" type="text" id="stashed-9" defaultValue={props.inventory[11] || ""}></input>
            <button onClick={() => moveToCarried(11)}>Move to Carried</button>
        </div>
        </>
    )
}