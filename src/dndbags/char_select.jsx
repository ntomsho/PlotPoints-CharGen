import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { CLASSES, CLASS_COLORS, SKILLS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';
import Dndb from './Dndb';
import ModalManager from '../modal_manager';

let currentUser;
Auth.currentAuthenticatedUser().then(user => {
    currentUser = user.username;
})

export default function CharSelect(props) {
    const [charsList, setCharsList] = useState([]);
    const [char, setChar] = useState({});
    const [modalOut, setModalOut] = useState(false);

    const defaultSheet = {
        name: "",
        cClass: "",
        race: "Human",
        background: "",
        appearance: "",
        derp: "",
        health: 7,
        plotPoints: 1,
        trainedSkills: [],
        currentSpecials: {},
        inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
        level: 1,
        experience: 0,
        regulation: true
    }

    useEffect(() => {
        updateChars();
    }, []);

    async function get() {
        console.log('calling api get');
        let myChars = [];
        let otherChars = [];
        const response = await API.get('dndb', '/dndb');
        response.data.forEach(loadChar => {
            if (loadChar.playerName === currentUser) {
                myChars.push(loadChar);
            }
        })
        return(myChars);
    }

    async function getChar(charName) {
        console.log('calling api get');
        const response = await API.get('dndb', `/dndb/${charName}`)
        return response;
    }

    function saveChar(char) {
        getChar(char.name).then(response => {
            const existingChar = response[0];
            if (!existingChar || existingChar.playerName === currentUser) {
                put(char);
            } else {
                alert(`There's already a character named ${char.name}. Don't blame me, blame ${existingChar.playerName}.`);
            }
        })
    }

    async function put(char) {
        console.log('calling api post');
        let newChar = Object.assign({}, char);
        newChar['playerName'] = currentUser;
        newChar['trainedSkills'] = JSON.stringify(char.trainedSkills);
        newChar['currentSpecials'] = JSON.stringify(char.currentSpecials);
        newChar['inventory'] = JSON.stringify(char.inventory);
        newChar['regulation'] = char.regulation ? "true" : "false";
        const response = await API.put('dndb', '/dndb', {
            body: {
                ...newChar
            }
        });
        alert(`Character saved!`);
    }

    function updateChars() {
        get().then(chars => setCharsList(chars));
    }

    function clearChar() {
        setChar({});
    }

    function blankSheet() {
        setChar(defaultSheet);
    }

    function loadChar(loadChar) {
        let newChar = loadChar;
        newChar['trainedSkills'] = JSON.parse(newChar['trainedSkills'])
        newChar['currentSpecials'] = JSON.parse(newChar['currentSpecials'])
        newChar['inventory'] = JSON.parse(newChar['inventory'])
        console.log(newChar)
        setChar(newChar);
    }

    function randomChar() {
        let newChar = defaultSheet;
        newChar['cClass'] = random(CLASSES);
        newChar['race'] = randomRace();
        newChar['background'] = random(BACKGROUNDS);
        newChar['appearance'] = random(APPEARANCES);
        newChar['derp'] = random(DERPS);
        newChar['trainedSkills'] = newChar['race'] === "Human" ? [random(SKILLS)] : [];
        setChar(newChar);
    }

    function charSelectDisp() {
        return (
            <div className="char-select-menu">
                <h1 className="color-header">Dungeons & Douchebags</h1>
                <div className="random-character">
                    <h2 className="char-select-link" onClick={randomChar}>Generate New<br/>Random Character</h2>
                </div>
                <div className="blank-character">
                    <h2 className="char-select-link" onClick={blankSheet}>Blank Character Sheet</h2>
                </div>
                <div className="load-character">
                    <h2>Load Character</h2>
                    <strong onClick={updateChars}>Refresh Characters List</strong>
                    <ul>
                        {charsList.map(char => {
                            return (
                                <li key={char.name} style={{ cursor: 'pointer' }} onClick={() => loadChar(char)}>
                                    <div>{char.name}</div>
                                    <div style={{ color: CLASS_COLORS[char.cClass] }}>{char.cClass}</div>
                                    <div>Level: {char.level}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    if (JSON.stringify(char) !== JSON.stringify({})) {
        return (
            <div id="dndb-main-container">
                <Dndb
                    loadedChar={char} 
                    clearChar={clearChar} 
                    saveChar={saveChar} 
                    setModalOut={setModalOut} 
                />
                <ModalManager modalOut={modalOut} setModalOut={setModalOut} />
            </div>
        )
    } else {
        return charSelectDisp()
    }
}