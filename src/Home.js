import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <button id="dnd-button"><Link to="/dndb">Dungeons and Douchebags</Link></button>
    )
}