import React, { useState } from 'react';
import { CLASS_SKILLS, SKILLS, SKILL_USES, random } from '../dndb-tables';
import SkillButton from './skill_button';

export default function Skills(props) {
    const [highlightedSkill, setHighlightedSkill] = useState("");
    const classSkills = CLASS_SKILLS[props.cClass] || [];
    const skillSet = props.trainedSkills;
    const maxRegSkills = props.race === "Human" ? 1 : 0;
    let numClassSkills = 0;
    let numRegSkills = 0;
    skillSet.forEach(skill => {
        if (classSkills.includes(skill)) {
            numClassSkills === 0 ? numClassSkills++ : numRegSkills++;
        } else {
            numRegSkills++;
        }
    })
    
    function remainingClassSkills() {
        if (numClassSkills === 0) {
            return (
                <span>Choose a <strong style={{ border: '3px solid black' }}>Class Skill</strong></span>
            )
        }
    }

    function randomSkill() {
        let newSkill = random(SKILLS);
        while (props.trainedSkills.includes(newSkill)) {
            newSkill = random(SKILLS);
        }
        return newSkill;
    }
    
    function remainingSkills() {
        if (numRegSkills < maxRegSkills) {
            return (
                <>
                <span>{maxRegSkills} Random Skill{numRegSkills > 1 ? "s" : ""} Remaining</span>
                <button onClick={() => selectSkill(randomSkill())}>Random ⚀</button>
                </>
            )
        }
    }

    function skillDesc() {
        if (highlightedSkill) {
            return (
                <div style={{ width: '33%' }}>
                    <h3>{highlightedSkill}</h3>
                    <div>{SKILL_USES[highlightedSkill]}</div>
                    <button onClick={() => selectSkill(highlightedSkill)}>{skillSet.includes(highlightedSkill) ? 'Remove Skill' : 'Add Skill'}</button>
                </div>
            )
        }
    }

    function selectSkill(skill) {
        let newSkillSet = props.trainedSkills;
        const inClass = classSkills.includes(skill);
        const selected = skillSet.includes(skill);

        if (selected) {
            if (inClass && numClassSkills < 2) {
                numClassSkills--;
            } else {
                numRegSkills--;
            }
            newSkillSet.splice(newSkillSet.indexOf(skill), 1);
            props.updateState('trainedSkills', newSkillSet);
        } else {
            if (inClass && numClassSkills === 0) {
                numClassSkills++;
                newSkillSet.push(skill);
                props.updateState('trainedSkills', newSkillSet);
            } else if (numRegSkills < maxRegSkills) {
                numRegSkills++;
                newSkillSet.push(skill);
                props.updateState('trainedSkills', newSkillSet);
            }
        }
    }

    function createSkillRow(i) {
        return SKILLS.slice(i, i + 3).map((skill, ind) => {
            return (
                <SkillButton key={ind}
                    skill={skill}
                    classSkill={classSkills.includes(skill)}
                    selected={skillSet.includes(skill)}
                    setHighlightedSkill={setHighlightedSkill}
                    selectSkill={selectSkill}
                />
            )
        })
    }

    return (
        <>
        <h2>Skills</h2>
            <div style={{display: 'flex'}}>
            <div id="skills-container" style={{width: '66%'}}>
                {remainingSkills()}
                {remainingClassSkills()}
                <div className="sheet-row">
                    {createSkillRow(0)}
                </div>
                <div className="sheet-row">
                    {createSkillRow(3)}
                </div>
                <div className="sheet-row">
                    {createSkillRow(6)}
                </div>
            </div>
            {skillDesc()}
        </div>
        </>
    )
}