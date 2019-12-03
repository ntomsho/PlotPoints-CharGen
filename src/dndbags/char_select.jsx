import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';
import { CLASSES, CLASS_COLORS, SKILLS, ALTRACES, random, randomRace, BACKGROUNDS, APPEARANCES, DERPS } from '../dndb-tables';
import Dndb from './Dndb';
import ModalManager from '../modal_manager';
import MyNavbar from '../navbar';

function CharSelect(props) {
    const [charsList, setCharsList] = useState([]);
    const [char, setChar] = useState({});
    const [modalOut, setModalOut] = useState(false);
    const [rollerOut, setRollerOut] = useState(false);
//Move char state to here and pass it to Dndb in props?
    const defaultSheet = {
        name: "",
        cClass: "",
        raceString: "Human",
        raceTraits: [],
        background: "",
        appearance: "",
        derp: "",
        health: 7,
        plotPoints: 1,
        selectedFightingSkill: "",
        trainedSkills: [],
        currentSpecials: {},
        inventory: ["", "", "", "", "", "", "", "", "", "", "", ""],
        level: 1,
        experience: 0,
        advancements: [],
        savedTag: "",
        favoriteTags: [],
        rerolls: 0,
        regulation: true
    }

    useEffect(() => {
        updateChars();
    }, [props.currentUser]);

    function updateState(key, val) {
        let newState = Object.assign({}, char);
        newState[key] = val;
        setChar(newState);
    };

    function handleChange(event) {
        if (event.target.name === "cClass") {
            let newState = Object.assign({}, char);
            newState['currentSpecials'] = {};
            newState['cClass'] = event.target.value
            setChar(newState);
        } else {
            updateState(event.target.name, event.target.value)
        }
    }

    async function get() {
        console.log('calling api get');
        let myChars = [];
        const response = await API.get('dndb', '/dndb');
        response.data.forEach(loadChar => {
            if (loadChar.playerName === props.currentUser) {
                myChars.push(loadChar);
            }
        })
        return(myChars);
    }

    async function getChar(charName) {
        const response = await API.get('dndb', `/dndb/${charName}`)
        return response;
    }

    function saveChar(char) {
        getChar(char.name).then(response => {
            const existingChar = response[0];
            if (!existingChar || existingChar.playerName === props.currentUser) {
                put(char);
            } else {
                alert(`There's already a character named ${char.name}. Don't blame me, blame ${existingChar.playerName}.`);
            }
        })
    }

    async function put(char) {
        console.log('calling api post');
        let newChar = Object.assign({}, char);
        newChar['playerName'] = props.currentUser;
        newChar['raceTraits'] = JSON.stringify(char.raceTraits);
        newChar['trainedSkills'] = JSON.stringify(char.trainedSkills);
        newChar['currentSpecials'] = JSON.stringify(char.currentSpecials);
        newChar['inventory'] = JSON.stringify(char.inventory);
        newChar['advancements'] = JSON.stringify(char.advancements);
        newChar['favoriteTags'] = JSON.stringify(char.favoriteTags);
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
        newChar['raceTraits'] = JSON.parse(newChar['raceTraits']);
        newChar['trainedSkills'] = JSON.parse(newChar['trainedSkills']);
        newChar['currentSpecials'] = JSON.parse(newChar['currentSpecials']);
        newChar['inventory'] = JSON.parse(newChar['inventory']);
        newChar['advancements'] = JSON.parse(newChar['advancements']);
        newChar['favoriteTags'] = JSON.parse(newChar['favoriteTags']);
        setChar(newChar);
    }

    function randomChar() {
        let newChar = defaultSheet;
        newChar['cClass'] = random(CLASSES);
        // newChar['race'] = randomRace();
        newChar['background'] = random(BACKGROUNDS);
        newChar['appearance'] = random(APPEARANCES);
        newChar['derp'] = random(DERPS);
        newChar['trainedSkills'] = newChar['race'] === "Human" ? [random(SKILLS)] : [];
        setChar(newChar);
    }

    function charSelectDisp() {
        return (
            <>
            <MyNavbar currentUser={props.currentUser}
                currentChar={null}
                charsList={charsList}
                clearChar={clearChar}
                saveChar={saveChar}
                randomChar={randomChar}
            />
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
            </>
        )
    }

    if (JSON.stringify(char) !== JSON.stringify({})) {
        return (
            <div id="dndb-main-container">
                <MyNavbar currentUser={props.currentUser}
                    currentChar={char}
                    charsList={charsList}
                    clearChar={clearChar}
                    saveChar={saveChar}
                    randomChar={randomChar}
                />
                <Dndb
                    loadedChar={char} 
                    clearChar={clearChar} 
                    saveChar={saveChar} 
                    modalOut={modalOut}
                    rollerOut={rollerOut}
                    setModalOut={setModalOut} 
                    setRollerOut={setRollerOut}
                    updateState={updateState}
                    handleChange={handleChange}
                />
                <ModalManager modalOut={modalOut} setModalOut={setModalOut} />
            </div>
        )
    } else {
        return charSelectDisp()
    }
}

export default withAuthenticator(CharSelect, {
    includeGreetings: false,
    authenticatorComponents: [MyNavbar]
});