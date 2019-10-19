import React, { useState } from 'react';
import { CLASS_SKILLS, SKILLS } from '../dndb-tables';

export default function Skills(props) {

    const classSkills = props.cClass ? CLASS_SKILLS[props.cClass] : [];

    const [skillSet, setSkillSet] = useState(props.skills);
    const [numClassSkills, setNumClassSkills] = useState(1);
    const [numRegSkills, setNumRegSkills] = useState(props.race === "Human" ? 1 : 0);

    function remainingClassSkills() {
        if (numClassSkills > 0) {
            return (
                <span>Choose {numClassSkills} Class Skill</span>
            )
        }
    }
    
    function remainingSkills() {
        if (numRegSkills > 0) {
            return (
                <>
                <span>{numRegSkills} Random Skill{numRegSkills > 1 ? "s" : ""} Remaining</span>
                <button>Random ⚀</button>
                </>
            )
        }
    }

    function selectSkill(skill, inClass, selected) {
        let newSkillSet = props.trainedSkills;
        if (selected) {
            inClass ? setNumClassSkills(numClassSkills + 1) : setNumRegSkills(numRegSkills + 1);
            newSkillSet.splice(newSkillSet.indexOf(skill), 1);
            props.updateState('trainedSkills', newSkillSet);
        } else {
            inClass ? setNumClassSkills(numClassSkills - 1) : setNumRegSkills(numRegSkills - 1);
            newSkillSet.push(skill);
            props.updateState('trainedSkills', newSkillSet);
        }
    }

    return (
        <>
        <h2>Skills</h2>
        <div id="skills-container">
            {remainingSkills()}
            {remainingClassSkills()}
            <div className="sheet-row">
                {SKILLS.slice(0, 3).map(skill => {
                    console.log(classSkills);
                    return (
                        <button className={`skill-button` + `${classSkills.includes(skill) ? " class-skill" : ""}` + `${skillSet.includes(skill) ? " selected" : ""}`}
                            onClick={selectSkill(skill, )}
                        >
                            {skill}
                        </button>
                    )
                })}
            </div>
            <div className="sheet-row">
                {SKILLS.slice(3,6).map(skill => {
                    return (
                        <button className={classSkills.includes(skill) ? "skill-button class-skill unselected" : "skill-button unselected"}>
                            {skill}
                        </button>
                    )
                })}
            </div>
            <div className="sheet-row">
                {SKILLS.slice(6, 9).map(skill => {
                    return (
                        <button className={classSkills.includes(skill) ? "skill-button class-skill unselected" : "skill-button unselected"}>
                            {skill}
                        </button>
                    )
                })}
            </div>
        </div>
        </>
    )
}