import React from 'react';
import { useDrag } from 'react-dnd';

export default function WordOfPower(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: props.word.category, id: props.word },
        canDrag: !props.disabled,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
    let color;
    if (!props.disabled) {
        props.declared ?
            color = "green" :
            color = "black";
    } else {
        color = "gray";
    }

    return (
        <li
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: props.disabled ? 'normal' : 'pointer',
                width: 'max-content',
                color: color
            }}
        >
            <div>
                <span>{props.word.word}</span> &nbsp;
                <span>{props.word.category}</span>
                <button onClick={() => props.randomizeWord(props.ind)}>Randomize</button>
            </div>
        </li>
    )
}