import React, { useState } from 'react';
import { random, SONGS, ELEMENTS, ELEMENTS_OF, GERUNDS } from '../../dndb-tables';

export default function Minstrel(props) {
    const { currentSpecials } = props;
    const [currentSong, setCurrentSong] = useState("");
    const input = React.createRef();

    if (!currentSpecials.songs) {
        props.updateState('currentSpecials', { 'songs': [] })
    }

    function randomSong() {
        return random([
            `${random(ELEMENTS)} ${random(SONGS)}`,
            `${random(SONGS)} of ${random(ELEMENTS_OF)}`,
            `${random(GERUNDS)} ${random(SONGS)}`,
            `${random(SONGS)} of ${random(GERUNDS)} ${random(ELEMENTS_OF)}`
        ])
    }

    function createSongs() {
        let songs = [];
        for (let i = 0; i < 4; i++) {
            songs.push(randomSong());
        };
        props.updateState('currentSpecials', { 'songs': songs });
    }

    function playSong(songInd) {
        setCurrentSong(currentSpecials.songs[songInd]);
        let newSongs = currentSpecials.songs;
        newSongs.splice(songInd, 1);
        props.updateState('currentSpecials', { 'songs': newSongs });
    }

    function currentSongDisp() {
        if (currentSong) {
            return (
                <>
                    <div>
                        Currently Playing:<br /><strong>{currentSong}</strong>
                    </div>
                    <button onClick={() => setCurrentSong(null)}>End Song</button>
                </>
            )
        }
    }

    function addCustomSong() {
        let newSongs = currentSpecials.songs;
        newSongs.push(input.current.value);
        props.updateState('currentSpecials', { 'songs': newSongs });
    }

    function sacrificeSong(songInd) {
        let newSongs = currentSpecials.songs;
        newSongs.splice(songInd, 1);
        props.updateState('currentSpecials', { 'songs': newSongs })
    }

    function songsDisp() {
        if (currentSpecials.songs) {
            return (
                <ul className="resource-list">
                    {currentSpecials.songs.map((song, i) => {
                        return (
                            <li key={i} className="resource-list-entry">
                                <div className={`song${currentSong === song ? ' selected' : ''}`}>{song}</div>
                                <button onClick={() => playSong(i)}>🎵</button>
                                <button onClick={() => sacrificeSong(i)}>X</button>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    
    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A rockin’ magical songsmith and all-around entertainer.</div>
                <br />
                <div className="ability-desc">
                    <div>Magic Ability:<br /><strong>Bard Songs</strong></div>
                    <div>Your music is magic! Whenever you start playing one of your songs, you can use its magical effects in any action for the rest of the scene. You can sacrifice a song you aren't playing or end one you are playing to create a Crescendo:</div>
                    <ul>
                        <li>Create a blast of sound and force from your instrument or voice</li>
                        <li>Give yourself or an ally Magic Advantage on an action</li>
                    </ul>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {currentSongDisp()}
                </div>
                <div className="resource-lists-container" id="form-list">
                    {songsDisp()}
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Song: </div>
                        <div className="custom-add-field">
                            <input type="text" ref={input}></input><button onClick={addCustomSong}>+</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createSongs}>Generate New Songs<br/>(On rest)</button>
                </div>
            </div>
        </div>
    )
}