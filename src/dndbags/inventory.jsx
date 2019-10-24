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

    function handleChange(event) {
        let newInventory = props.inventory;
        newInventory[parseInt(event.target.name)] = event.target.value;
        props.updateState('inventory', newInventory);
    }

    return (
        <>
        <h2>Inventory</h2>
        <button onClick={randomizeInventory}>Randomize Inventory</button>
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