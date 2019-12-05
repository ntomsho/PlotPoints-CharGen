import React, {useState, useEffect} from 'react';
import { random, SKILLS, CLASS_SKILLS, CLASS_COLORS, FIGHTING_SKILLS, CIVILIZED_SKILLS, CLASS_FIGHTING_SKILLS } from '../../dndb-tables';

export default function CharGenSkills(props) {
    const [skillFirstRoll, setSkillFirstRoll] = useState(true);

    function selectSkill(skill) {
        let newSkills = props.trainedSkills;
        if (newSkills.includes(skill)) {
            newSkills.splice(newSkills.indexOf(skill), 1);
        } else {
            newSkills.push(skill);
        }
        props.updateSelection('trainedSkills', newSkills);
    }

    function fightingSkillsDisplay() {
        let remainingSkills;
        let skillSet = CLASS_FIGHTING_SKILLS[props.cClass];
        if (skillSet) {
            remainingSkills = skillSet.length === 2 ? <div>Choose one</div> : <div> </div>;
        }
        return (
            <>
            <h3>Fightin' Skills</h3>
            {remainingSkills}
            {FIGHTING_SKILLS.map((skill, i) => {
                const classSkill = CLASS_FIGHTING_SKILLS[props.cClass].includes(skill);
                return (
                    <button key={i}
                        style={classSkill ? { borderColor: CLASS_COLORS[props.cClass] } : {}}
                        className={`skill-button ${classSkill ? " class-skill" : ""} ${props.trainedSkills.includes(skill) ? " selected" : ""}`}
                        onClick={() => selectSkill(skill)}
                    >
                        {skill}
                    </button>
                )
            })}
            </>
        )
    }

    function civilizedSkillsDisplay() {

    }

    return (
        <>
        <div>{props.trainedSkills.length}</div>
            <div>{props.trainedSkills}</div>
            {fightingSkillsDisplay()}
        <div className="skills-container">
            
        </div>
        </>
    )
}