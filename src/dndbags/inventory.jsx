import React from 'react';

export default function Inventory(props) {

    function randomizeInventory() {

    }

    return (
        <>
        <h2>Inventory</h2>
        <br/>
        <h3>Carried Gear</h3>
        <div className="sheet-row">
            <input type="text" id="carried-1" value={props.inventory[0] || ""}></input>
            <input type="text" id="carried-2" value={props.inventory[1] || ""}></input>
            <input type="text" id="carried-3" value={props.inventory[2] || ""}></input>
        </div>
        <h3>Stashed Gear</h3>
        <div className="sheet-row">
            <input type="text" id="stashed-1" value={props.inventory[3] || ""}></input>
            <input type="text" id="stashed-2" value={props.inventory[4] || ""}></input>
            <input type="text" id="stashed-3" value={props.inventory[5] || ""}></input>
        </div>
        <div className="sheet-row">
            <input type="text" id="stashed-4" value={props.inventory[6] || ""}></input>
            <input type="text" id="stashed-5" value={props.inventory[7] || ""}></input>
            <input type="text" id="stashed-6" value={props.inventory[8] || ""}></input>
        </div>
        <div className="sheet-row">
            <input type="text" id="stashed-7" value={props.inventory[9] || ""}></input>
            <input type="text" id="stashed-8" value={props.inventory[10] || ""}></input>
            <input type="text" id="stashed-9" value={props.inventory[11] || ""}></input>
        </div>
        </>
    )
}