import React, { useState, useEffect } from 'react';
import { CLASS_SKILLS, SKILLS } from '../dndb-tables';
import SkillButton from './skill_button';

export default function Skills(props) {
    const classSkills = CLASS_SKILLS[props.cClass];
    const skillSet = props.trainedSkills;
    const maxRegSkills = props.race === "Human" ? 1 : 0;
    let numClassSkills = 0;
    let numRegSkills = 0;
    skillSet.forEach(skill => {
        if (classSkills.includes(skill)) {
            numClassSkills == 0 ? numClassSkills++ : numRegSkills++;
        } else {
            numRegSkills++;
        }
    })
    
    function remainingClassSkills() {
        if (numClassSkills === 0) {
            return (
                <span>Choose a Class Skill</span>
            )
        }
    }
    
    function remainingSkills() {
        if (numRegSkills < maxRegSkills) {
            return (
                <>
                <span>{maxRegSkills} Random Skill{numRegSkills > 1 ? "s" : ""} Remaining</span>
                <button>Random ⚀</button>
                </>
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
                    selectSkill={selectSkill}
                />
            )
        })
    }

    return (
        <>
        <h2>Skills</h2>
        <div id="skills-container">
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
        </>
    )
}