import React from 'react';

export default function SkillButton(props) {
    const { skill } = props;
    console.log(skill);
    return (
        <button className={`skill-button ${props.classSkill ? " class-skill" : ""} ${props.selected ? " selected" : ""}`}
            onClick={props.selectSkill(skill)}
        >
            {skill}
        </button>
    )
}