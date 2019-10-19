import React, { useState, useEffect } from 'react';
import { CLASS_SKILLS, SKILLS } from '../dndb-tables';
import SkillButton from './skill_button';

export default function Skills(props) {
    const [classSkills, setClassSkills] = useState([]);
    const [skillSet, setSkillSet] = useState([]);
    const [numClassSkills, setNumClassSkills] = useState(1);
    const [numRegSkills, setNumRegSkills] = useState(props.race === "Human" ? 1 : 0);

    useEffect(() => {
        if (props.cClass) setClassSkills(CLASS_SKILLS[props.cClass]);
    }, [props.cClass]);

    useEffect(() => {
        if (props.trainedSkills) setSkillSet(props.trainedSkills);
    }, [props.trainedSkills]);
    
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