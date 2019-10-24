import React from 'react';
import { useMediaQuery } from 'react-responsive'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

export default function BackendWrapper(props) {
    console.log(useMediaQuery({ query: 'min-device-width: 600px' }) ? "Using HTML" : "Using Touch")
    return (
        <DndProvider backend={useMediaQuery({query: 'min-device-width: 600px'}) ? HTML5Backend : TouchBackend}>
            {props.children}
        </DndProvider>
    )
}