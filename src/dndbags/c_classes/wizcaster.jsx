import React, { useState, useEffect } from 'react';
import { random, FORMS, GERUNDS, VERBS, ELEMENTS, ELEMENTS_OF } from '../../dndb-tables';
import WordOfPower from './word_of_power';
import WordSpace from './word_space';

export default function Wizcaster(props) {
    let { currentSpecials } = props;

    const [currentSpell, setCurrentSpell] = useState([]);
    const [keepWord, setKeepWord] = useState({word: null});
    const input1 = React.createRef();
    const input2 = React.createRef();

    useEffect(() => {
        let currentWords = [];
        for(let i = 0; i < currentSpell.length; i++) {
            currentWords.push(currentSpell[i].word);
        }
        if (!currentWords.includes(keepWord.word)) setKeepWord({word: null});
    }, [currentSpell]);

    if (!currentSpecials.words) {
        props.updateState('currentSpecials', { 'words': [] })
    }

    function addWordToCurrentSpell(word, start) {
        let newCurrentSpell = currentSpell;
        start ? newCurrentSpell.unshift(word) : newCurrentSpell.push(word);
        setCurrentSpell([...newCurrentSpell]);
    }

    function removeWordFromCurrentSpell(index) {
        if (currentSpell[index].word === keepWord.word) setKeepWord({word: null})
        let newCurrentSpell = currentSpell
        newCurrentSpell.splice(index, 1);
        setCurrentSpell([...newCurrentSpell]);
    }

    function currentSpellWord(word, index) {
        if (currentSpell.length >= 2 && index >= 1) {
            if (word.category === "Element" && currentSpell[index - 1].category === "Form") {
                return `of ${ELEMENTS_OF[ELEMENTS.indexOf(word.word)]}`
            }
            if (word.category === "Element" && currentSpell[index - 1].category === "Verb") {
                return ELEMENTS_OF[ELEMENTS.indexOf(word.word)]
            }
            if (word.category === "Verb" && currentSpell[index - 1].category === "Form") {
                return `of ${GERUNDS[VERBS.indexOf(word.word)]}`
            }
        }
        if (word.category === "Verb") {
            return GERUNDS[VERBS.indexOf(word.word)]
        }
        return word.word
    }

    function castSpellButton() {
        if (currentSpell.length >= 2) {
            return (
                <button onClick={castSpell}>Cast</button>
            )
        }
    }

    function currentSpellDisp() {
        let freeCategories = ["Form", "Element", "Verb"];
        currentSpell.forEach(spell => freeCategories.splice(freeCategories.indexOf(spell.category), 1));
        let startSpace = currentSpell.length < 3 ? <WordSpace start={true} accepts={freeCategories} currentSpell={currentSpell} addWordToCurrentSpell={addWordToCurrentSpell} /> : <></>;
        let endSpace = currentSpell.length < 3 ? <WordSpace start={false} accepts={freeCategories} currentSpell={currentSpell} addWordToCurrentSpell={addWordToCurrentSpell} /> : <></>;

        return (
            <>
            {startSpace}
            {currentSpell.map((w, i) => {
                return (
                    <div key={i} className="current-spell-word">
                        <div>{currentSpellWord(w, i)}</div>
                        <button onClick={() => removeWordFromCurrentSpell(i)}>-</button>
                        <button className={`keepword${keepWord && keepWord.word === w.word ? ' selected' : '' }`} onClick={() => setKeepWord(w)}>Keep?</button>
                    </div>
                )
            })}
            {endSpace}
            </>
        )
    }

    function castSpell() {
        let newWords = currentSpecials.words;
        for(let i=0; i < currentSpell.length; i++) {
            if (currentSpell[i].word !== keepWord.word) {
                newWords.splice(newWords.indexOf(currentSpell[i]), 1);
            }
        }
        setCurrentSpell([]);
        props.updateState('currentSpecials', {'words': newWords});
    }
    
    function createRandomWord() {
        const wordCatName = random(["Form", "Element", "Verb"]);
        let wordCat;
        switch (wordCatName) {
            case "Form":
                wordCat = FORMS;
                break;
            case "Element":
                wordCat = ELEMENTS;
                break;
            default:
                wordCat = VERBS;
        }
        const word = random(wordCat);
        return { 'word': word, 'category': wordCatName }
    }
    
    function randomizeWords() {
        let words = [];
        while (words.length < 6) {
            const newWord = createRandomWord();
            if (!words.includes(newWord)) {
                words.push(newWord);
            }
        }
        setCurrentSpell([]);
        props.updateState('currentSpecials', {'words': words});
    }

    function randomizeWord(num) {
        let words = currentSpecials.words;
        const newWord = createRandomWord();
        words[num] = newWord;
        setCurrentSpell([]);
        props.updateState('currentSpecials', {'words': words});
    }

    function addCustomWord() {
        let newWords = currentSpecials.words;
        newWords.push({'word': input1.current.value, 'category': input2.current.value})
        props.updateState('currentSpecials', {'words': newWords});
    }

    function wordsList() {
        if (currentSpecials.words) {
            let freeCategories = ["Form", "Element", "Verb"];
            currentSpell.forEach(spell => freeCategories.splice(freeCategories.indexOf(spell.category), 1));
            return (
                <ul style={{listStyle: 'none'}}>
                    {currentSpecials.words.map((obj, i) => {
                        
                        return (
                            <div key={i}>
                                <WordOfPower ind={i} word={obj} usable={freeCategories.includes(obj.category)} randomizeWord={randomizeWord} /> 
                                <button onClick={() => randomizeWord(i)}>Randomize</button>
                            </div>
                        )
                    })}
                </ul>
            )
        }
    }

    return (
        <div className="class-ability-container">
            <div className="class-info">
                <div className="class-desc">A graduate of Fighter College; a skilled combatant with a transforming magical weapon.</div>
                <br />
                <div>Magic Ability:<br /><strong>Graduate Weapon</strong></div>
                <div>Your capstone project is a shapechanging weapon. Whenever you defeat an enemy in battle, it gains one charge. You can spend one charge to:</div>
                <ul>
                    <li>Activate its magical property for one action</li>
                    <li>Change its weapon type or its magical property</li>
                </ul>
            </div>
            <div className="class-ability-display">
                <div className="ability-main">
                    {currentSpellDisp()}
                    {castSpellButton()}
                </div>
                <div className="words-list">
                    {wordsList()}
                </div>
                <div>
                    <button className="randomize-button" onClick={randomizeWords}>Generate New Words</button>
                    <span>Add Word of Power: </span>
                    <input type="text" ref={input1}></input>
                    <select ref={input2}>
                        <option value="Form">Form</option>
                        <option value="Element">Element</option>
                        <option value="Verb">Verb</option>
                    </select>
                    <button onClick={addCustomWord}>+</button>
                </div>
            </div>
        </div>
    )
}