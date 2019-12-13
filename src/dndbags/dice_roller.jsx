import React, { useState } from 'react';

export default function DiceRoller(props) {
    const [disadvantage, setDisadvantage] = useState(false);
    const [advantageDice, setAdvantageDice] = useState([]);
    const [mainDie, setMainDie] = useState(null);
    const [displayRoll, setDisplayRoll] = useState('');

    const dieFaces = ['⚀','⚁','⚂','⚃','⚄','⚅'];

    function resetDice() {
        let newDice = advantageDice.map(die => null);
        setAdvantageDice(newDice);
        setMainDie(null);
        setDisplayRoll('');
    }

    function changeDice(increment) {
        let newDice = advantageDice;
        if (increment && newDice.length < 3) {
            if (disadvantage) {
                setDisadvantage(false)
                newDice.pop();
            } else {
                newDice.push(null);
            }
        }
        else if (!increment && !disadvantage) {
            if (newDice.length === 0) {
                setDisadvantage(true)
                newDice.push(null);
             } else {
                newDice.pop();
             }
        }
        setAdvantageDice(newDice);
        resetDice();
    }

    function resultText() {
        if (displayRoll) {
            if (mainDie === 1) {
                return "Critical Failure: You fail, hard; take a Serious Consequence";
            } else if (mainDie === 20) {
                return "Critical Success: You succeed or make Progress (2) and then some";
            } else if (displayRoll <= 9) {
                return "Failure: You fail; Take a Consequence"
            } else if (displayRoll >= 18) {
                return "Success: You succeed or make Progress (2)"
            } else {
                return "Pass: You succeed or make Progress (2), but take a Consequence"
            }
        }
        return "";
    }

    function rollDice() {
        const mainRoll = Math.floor(Math.random() * 20 + 1);
        let newDice = advantageDice.map(die => Math.floor(Math.random() * 6) + 1);
        console.log(newDice);
        const advSum = newDice.reduce((acc, num) => acc + num, 0);
        let result = mainRoll
        disadvantage ? result -= advSum : result += advSum;
        setAdvantageDice(newDice);
        setMainDie(mainRoll);
        setDisplayRoll(result);
    }

    return (
        <div className={`dice-roller-container${props.extended ? '' : ' hidden'}`}>
            <div className="dice-roller-main">
                <button onClick={() => props.setRollerOut(false)}
                    style={{ position: 'absolute', height: '5vh', width: '4vw', right: '0', top: '0' }}
                >
                    X
                </button>
                {/* <img className="d20" src="https://thecarnivoreproject.typepad.com/.a/6a00d8345295c269e201b7c86447b6970b-600wi"></img>
                <div className="d20-value">{mainDie === null ? "20" : mainDie}</div> */}
                <div className="d20">
                    <div className="d20-value">{mainDie === null ? "" : mainDie}</div>
                </div>
                <h2>Advantage Dice</h2>
                <div className="advantage-container">
                    <button onClick={() => changeDice(false)}>-</button>
                    {advantageDice.map((die, i) => {
                        return (
                            <div key={i} className="advantage-die" style ={{color: disadvantage ? 'red' : 'black'}}>
                                {die === null ? `${dieFaces[i]}` : dieFaces[die - 1]}
                            </div>
                        )
                    })}
                    <button onClick={() => changeDice(true)}>+</button>
                </div>
                <div>
                    <div>{displayRoll}</div>
                    <div>{resultText()}</div>
                </div>
                <button onClick={rollDice}>Roll</button>
            </div>
        </div>
    )
}