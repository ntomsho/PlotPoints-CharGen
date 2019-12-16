import React, { useState } from 'react';

export default function DiceRoller(props) {
    const [disadvantage, setDisadvantage] = useState(false);
    const [advantageDice, setAdvantageDice] = useState([null, null, null]);
    const [disadvantageDie, setDisadvantageDie] = useState(null);
    const [mainDie, setMainDie] = useState(null);
    const [difficulty, setDifficulty] = useState(0);
    const [selectedDice, setSelectedDice] = useState([false, false, false]);
    const [displayRoll, setDisplayRoll] = useState('');
    const [rollHistory, setRollHistory] = useState([]);

    const blankd6 = '▢';
    const dieFaces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    const advantageSources = [
        "You have a Skill that applies",
        "You have Magic that applies",
        "You have a Circumstance in your favor"
    ]

    function resetDice() {
        let newDice = advantageDice.map(die => null);
        setAdvantageDice(newDice);
        setMainDie(null);
        setDisplayRoll('');
    }

    function selectAdvantageDie(ind) {
        let newDice = [...selectedDice];
        newDice[ind] = newDice[ind] ? false : true;
        setSelectedDice(newDice);
    }

    function changeDifficulty(inc) {
        if (inc && difficulty < 3) {
            setDifficulty(difficulty + 1);    
        } else if (!inc && difficulty > 0) {
            setDifficulty(difficulty - 1);
        }
    }

    function numDice() {
        let num = 0;
        for (let i = 0; i < 3; i++) {
            if (selectedDice[i]) num++;
        }
        return num;
    }

    function diceSelectionDisplay() {
        let cancels = difficulty;
        return (
            <>
            {advantageDice.map((die, i) => {
                let canceled = false;
                if (selectedDice[i] && cancels > 0) {
                    cancels -= 1;
                    canceled = true;
                }
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>{advantageSources[i]}</div>
                        <div key={i} onClick={() => selectAdvantageDie(i)} className={selectedDice[i] ? 'advantage-die-selected' : 'advantage-die'}>
                            {die === null ? `${blankd6}` : dieFaces[die - 1]}
                            <div className={`canceled-x${canceled ? '' : ' hidden'}`}>X</div>
                        </div>
                    </div>
                )
            })}
            </>
        )
    }

    function disadvantageDieDisp() {
        return (
            <div style={{ color: 'red', display: 'flex', flexDirection: 'column' }}>
                <div>Disadvantage</div>
                <div className={disadvantageDie ? 'advantage-die' : 'advantage-die-selected'}>
                    {disadvantageDie ? dieFaces[disadvantageDie - 1] : blankd6}
                </div>
            </div>
        )
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
        let mod;
        let newDice;
        if (disadvantage) {
            mod = -1 * Math.floor(Math.random() * 6) + 1
            newDice = [mod, null, null];
        } else {
            let cancels = difficulty;
            newDice = selectedDice.map(die => {
                if (cancels && die) {
                    cancels -= 1;
                    return null;
                }
                return !!die ? Math.floor(Math.random() * 6) + 1 : 0;
            });
            console.log(newDice);
            mod = newDice.reduce((acc, num) => acc + num, 0);
        }
        let result = mainRoll + mod;
        setAdvantageDice(newDice);
        setMainDie(mainRoll);
        setDisplayRoll(result);
        const rolls = [...rollHistory];
        rolls.push({ 'result': result, 'mainRoll': mainRoll, 'd6s': newDice, 'disadvantage': disadvantage });
        setRollHistory(rolls);
    }

    return (
        <div className={`dice-roller-container${props.extended ? '' : ' hidden'}`}>
            <div className="dice-roller-main">
                <button onClick={() => props.setRollerOut(false)}
                    style={{ position: 'absolute', height: '5vh', width: '4vw', right: '0', top: '0' }}
                >
                    X
                </button>
                <div className="d20">
                    <div className="d20-value">{mainDie === null ? "" : mainDie}</div>
                </div>
                <h2>Advantage Dice</h2>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '25%'}}>
                        <div onClick={() => changeDifficulty(false)}>-</div>
                        <div><strong>Difficulty:</strong> <span>{difficulty}</span></div>
                        <div onClick={() => changeDifficulty(true)}>+</div>
                    </div>
                    {numDice() < difficulty ? disadvantageDieDisp() : <div></div> }
                </div>
                <br/>
                <div className="advantage-container">
                    {diceSelectionDisplay()}
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