import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div id="home-container">
            <Link to="/dndb">
                <button id="dnd-button">
                    Dungeons <br/> & <br/> Douchebags
                </button>
            </Link>
        </div>
    )
}