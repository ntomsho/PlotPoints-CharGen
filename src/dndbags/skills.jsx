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

    function createSkillRows() {
        let skillRows = [];
        for (let i = 0; i < 10; i += 3) {
            skillRows.push(SKILLS.slice(i, i + 3))
        };
        skillRows.map((skill, i) => {
            return (
                <div className="sheet-row">
                    <SkillButton key={i} props={{
                        skill: skill,
                        classSkill: classSkills.includes(skill),
                        selected: skillSet.includes(skill),
                        selectSkill: selectSkill
                    }}
                    />
                </div>
            )
        })
        return skillRows;
    }

    return (
        <>
        <h2>Skills</h2>
        <div id="skills-container">
            {remainingSkills()}
            {remainingClassSkills()}
            {createSkillRows()}
            {/* <div className="sheet-row">
                {SKILLS.slice(0, 3).map((skill, i) => {
                    return (
                        <SkillButton key={i} props={{
                            skill: skill,
                            classSkills: classSkills,
                            skillSet: skillSet,
                            selectSkill: selectSkill
                        }}
                        />
                    )
                })}
            </div>
            <div className="sheet-row">
                {SKILLS.slice(3, 6).map(skill => {
                    return (
                        <SkillButton props={{
                            skill: skill,
                            classSkills: classSkills,
                            skillSet: skillSet,
                            selectSkill: selectSkill
                        }}
                        />
                    )
                })}
            </div>
            <div className="sheet-row">
                {SKILLS.slice(6, 9).map(skill => {
                    return (
                        <SkillButton props={{
                            skill: skill,
                            classSkills: classSkills,
                            skillSet: skillSet,
                            selectSkill: selectSkill
                        }}
                        />
                    )
                })}
            </div> */}
        </div>
        </>
    )
}