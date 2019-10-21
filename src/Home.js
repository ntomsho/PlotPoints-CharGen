import React from 'react';
import { Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default function Home() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div id="home-container">
                <Link to="/dndb">
                    <button id="dnd-button">
                        Dungeons <br/> & <br/> Douchebags
                    </button>
                </Link>
            </div>
        </DndProvider>
    )
}