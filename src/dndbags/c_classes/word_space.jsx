import React from 'react';
import { useDrop } from 'react-dnd';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export default function WordSpace(props) {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ['Form', 'Element', 'Verb'],
        // canDrop: (item) => {
        //     console.log("Accepting: " + props.accepts);
        //     console.log("Dragging: " + item.type);
        //     props.accepts.includes(item.type);
        // },
        drop: (item) => {
            console.log("Dragged: " + item)
            props.addWordToCurrentSpell(item.id, props.start);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })
console.log("canDrop: " + canDrop)
    const isActive = isOver && canDrop;

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '60px',
                width: 'min-content',
                height: '40px',
                backgroundColor: props.mandatory ? 'darkgreen' : 'darkgray',
                margin: '5px',
                border: '2px solid lightgray',
                padding: '2px',
                textAlign: 'center'
            }}
        >
            <div>{props.word ? props.word.word + " " + props.word.category : " "}</div>
            {canDrop && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 5,
                        opacity: 0.5,
                        backgroundColor: 'lightgray'
                    }}
                />
            )}
            {isActive && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 5,
                        opacity: 0.5,
                        backgroundColor: 'white'
                    }}
                />
            )}
        </div>

    )
}