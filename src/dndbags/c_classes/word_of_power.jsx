import React from 'react';

export default function WordOfPower(props) {

    return (
        <li>
            <div>
                <span>{props.word}</span> 
                <span>{props.category}</span>
                <button onClick={() => props.randomizeWord(props.ind)}>Randomize</button>
            </div>
        </li>
    )
}