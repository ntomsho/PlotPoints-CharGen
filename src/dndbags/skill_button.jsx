import React from 'react';

export default function SkillButton(props) {
    console.log(props)
    console.log(props.skill)
    const { skill } = props;
    return (
        <button className={`skill-button ${props.classSkill ? " class-skill" : ""} ${props.selected ? " selected" : ""}`}
            onClick={() => props.selectSkill(skill)}
        >
            {props.skill}
        </button>
    )
}