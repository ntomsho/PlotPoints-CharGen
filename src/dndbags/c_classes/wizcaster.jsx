import React, { useState } from 'react';
import { random, FORMS, ELEMENTS, VERBS, ELEMENTS_OF, GERUNDS } from '../../dndb-tables';

export default function Wizcaster(props) {
    let { currentSpecials } = props;
    let { words } = currentSpecials;

    const [currentSpell, setCurrentSpell] = useState([])
    const [keepWordInd, setKeepWordInd] = useState(null)
    const [selectedWordInd, setSelectedWordInd] = useState(null)
    const input1 = React.createRef();
    const input2 = React.createRef();

    if (!currentSpecials.words) {
        props.updateState('currentSpecials', { 'words': [] });
    }

    function randomWord() {
        const wordCatName = random(["Form", "Element", "Verb"]);
        let wordCat;
        switch(wordCatName) {
            case "Form":
                wordCat = FORMS;
                break;
            case "Element":
                wordCat = ELEMENTS;
                break;
            default:
                wordCat = VERBS;
        }
        return { 'word': random(wordCat), 'wordCat': wordCatName }
    }

    function addCustomWord() {
        let newWords = words;
        newWords.push({ 'word': input2.current.value, 'wordCat': input1.current.value })
        props.updateState('currentSpecials', newWords);
    }

    function createWords() {
        let newWords = [];
        for (let i = 0; i < 6; i++) {
            newWords.push(randomWord());
        }
        setCurrentSpell([]);
        props.updateState('currentSpecials', { 'words': newWords });
    }

    function addWordToSpell(start, wordInd) {
        let newSpell = currentSpell;
        if (start) {
            if (keepWordInd !== null) setKeepWordInd(keepWordInd + 1);
            newSpell.unshift(wordInd);
            setCurrentSpell([...newSpell]);
        } else {
            newSpell.push(wordInd);
            setCurrentSpell([...newSpell]);
        }
        setSelectedWordInd(null);
    }

    function removeWordFromSpell(ind) {
        let newSpell = currentSpell;
        if (ind === keepWordInd) {
            setKeepWordInd(null);
        } else if (keepWordInd > ind) {
            setKeepWordInd(keepWordInd - 1);
        }
        newSpell.splice(ind, 1);
        setCurrentSpell([...newSpell]);
    }

    function castSpell() {
        let newWords = words;
        for (let i = 0; i < currentSpell.length; i++) {
            if (i !== keepWordInd) newWords.splice(currentSpell[i], 1);
        }
        setKeepWordInd(null);
        setSelectedWordInd(null);
        setCurrentSpell([]);
        props.updateState('currentSpecials', {'words': newWords});
    }

    function wordsListDisp() {
        if (words) {
            return (
                <ul className="resource-list">
                    {words.map((word, i) => {
                        return (
                            <li key={i} 
                            className={`resource-list-entry wizcaster-word${selectedWordInd === i ? ' selected' : ''}`} 
                            style={{width: '22vw'}}
                            onClick={() => selectedWordInd === i ? setSelectedWordInd(null) : setSelectedWordInd(i)}>
                                <div><strong>{word.word}</strong> {word.wordCat}</div>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    function currentSpellWord(word, index) {
        if (currentSpell.length >= 2 && index >= 1) {
            if (word.wordCat === "Element" && words[currentSpell[index - 1]].wordCat === "Form") {
                return `of ${ELEMENTS_OF[ELEMENTS.indexOf(word.word)]}`
            }
            if (word.wordCat === "Element" && words[currentSpell[index - 1]].wordCat === "Verb") {
                return ELEMENTS_OF[ELEMENTS.indexOf(word.word)]
            }
            if (word.wordCat === "Verb" && words[currentSpell[index - 1]].wordCat === "Form") {
                return `of ${GERUNDS[VERBS.indexOf(word.word)]}`
            }
        }
        if (word.wordCat === "Verb") {
            return GERUNDS[VERBS.indexOf(word.word)]
        }
        return word.word
    }

    function spellAddButtonLeft() {
        if (selectedWordInd !== null && selectedWordInd < words.length && !currentSpell.includes(selectedWordInd)) {
            if (words[selectedWordInd].wordCat === "Element" && 
            currentSpell.length > 0 && 
            words[currentSpell[0]].wordCat === "Verb") {
                return (<></>)
            } else {
                return (
                    <button className="ability-main-button" onClick={() => addWordToSpell(true, selectedWordInd)}>+</button>
                )
            }
        }
    }

    function spellAddButtonRight() {
        if (selectedWordInd !== null && currentSpell.length !== 0 && !currentSpell.includes(selectedWordInd)) {
            if (words[selectedWordInd].wordCat === "Verb" && currentSpell.length > 0 && words[currentSpell[currentSpell.length - 1].wordCat === "Element"]) {
                return (<></>)
            } else {
                return (
                    <button className="ability-main-button" onClick={() => addWordToSpell(false, selectedWordInd)}>+</button>
                )
            }
        }
    }

    function currentSpellDisp() {
        return (
            <div style={{display: 'flex'}}>
                {spellAddButtonLeft()}
                {currentSpell.map((wordInd, spellInd) => {
                    return (
                        <div className="wizcaster-spell-word" key={spellInd}>
                            <div className="wizcaster-spell-word">{currentSpellWord(words[wordInd], spellInd)}</div>
                            <button onClick={() => removeWordFromSpell(spellInd)}>Remove</button>
                            <button className={`keepword${keepWordInd === spellInd ? ' selected' : ''}`} onClick={() => setKeepWordInd(spellInd)}>Keep?</button>
                        </div>
                    )
                })}
                {spellAddButtonRight()}
            </div>
        )
    }

    function castSpellButton() {
        if (currentSpell.length > 1 && keepWordInd !== null) {
            return (
                <button className="ability-main-button" onClick={castSpell}>Cast Spell</button>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A sorcerer who combines ancient words of power to cast powerful spells.</div>
                <br />
                <div className="ability-desc">
                    <div>Magic Ability:<br /><strong>Words of Power</strong></div>
                    <div>The Wizcaster creates magic spells by combining Words of Power. Whenever you rest, you are given six words and you can combine two or three to create that effect.</div>
                    <div>Whenever you cast a spell, you can choose one Word to keep. Any others used in the spell are lost.</div>
                </div>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {currentSpellDisp()}
                        {castSpellButton()}
                    </div>
                </div>
                <div className="resource-lists-container">
                    {wordsListDisp()}
                </div>
                <div className="ability-management-container">
                    <div className="custom-add-row">
                        <div>Add Word of Power: </div>
                        <div className="custom-add-field">
                            <select ref={input1}>
                                <option value="Form">Form</option>
                                <option value="Element">Element</option>
                                <option value="Verb">Verb</option>
                            </select>
                            <input style={{width: '30vw'}} type="text" ref={input2}></input>
                            <button onClick={addCustomWord}>+</button>
                        </div>
                    </div>
                    <button className="ability-randomize-button" onClick={createWords}>Generate New Words</button>
                </div>
            </div>
        </div>
    )
}