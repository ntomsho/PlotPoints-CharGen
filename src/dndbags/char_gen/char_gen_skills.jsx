import React, {useState} from 'react';
import { SKILLS, FIGHTING_SKILLS, CIVILIZED_SKILLS, CLASS_FIGHTING_SKILLS, RACE_TRAITS, randomRace } from '../../dndb-tables';

export default function CharGenSkills(props) {
    const [raceFirstRoll, setRaceFirstRoll] = useState(true);
    const [skillFirstRoll, setSkillFirstRoll] = useState(true);
    
    function rollRace() {
        if (raceFirstRoll || props.rerolls > 0) {
            const newRaceTraits = randomRace();
            console.log(newRaceTraits);
            let newRaceString;
            if (newRaceTraits === "Human") {
                if (!raceFirstRoll) {
                    newRaceString = "Still Human";
                } else {
                    newRaceString = "Human";
                }
            } else {
                newRaceString = "";
            }
            props.updateSelection("raceString", newRaceString, !raceFirstRoll);
            props.updateSelection("raceTraits", newRaceTraits, false);
            if (raceFirstRoll) setRaceFirstRoll(false);
        }
    }

    function raceStringDisplay() {
        if (!raceFirstRoll) {
            const stringBox = props.raceTraits === "Human" ? 
                <span>Human</span> :
                <><span>er... something else. Name your race: </span><input type="text" value={props.raceString} onChange={(e) => props.updateSelection('raceString', e.value)}></input></>
            return (
                <div>You are a {stringBox}</div>
            )
        }
    }

    function raceTraitsDisplay() {
        if (!raceFirstRoll) {
            if (props.raceTraits === "Human") {
                return (
                    <div>You gain training in an additional Skill. You can choose your second Class Skill, or roll a random Civilized Skill</div>
                )
            } else {
                return (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>You have the following traits that give you Magic Advantage when relevant:</div>
                        <div>
                            <div>{props.raceTraits[0]}</div>
                            <div>{props.raceTraits[1]}</div>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <>
        <h2>Race (but not in like a racist way)</h2>
        <button onClick={rollRace}>
            {raceFirstRoll ? "Roll Race" : "Reroll Race (oh, you think you're better than them?)"}
        </button>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
            {raceStringDisplay()}
            {raceTraitsDisplay()}
        </div>
        <h2>Skills</h2>
        </>
    )
}