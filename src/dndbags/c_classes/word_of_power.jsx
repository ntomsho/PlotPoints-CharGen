import React from 'react';
import { useDrag } from 'react-dnd';

export default function WordOfPower(props) {

    const [{ isDragging }, drag] = useDrag({
        // item: { type: 'Form', id: props.word },
        item: { type: props.word.category, id: props.word},
        canDrag: !props.disabled,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    return (
        <li
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                width: 'max-content',
                color: 'black'
            }}
        >
            <div>
                <span>{props.word.word}</span> &nbsp;
                <span>{props.word.category}</span>
            </div>
        </li>
    )
}