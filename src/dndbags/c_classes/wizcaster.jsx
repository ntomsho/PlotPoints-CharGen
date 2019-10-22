import React, { useState } from 'react';
import { random, FORMS, GERUNDS, VERBS, ELEMENTS, ELEMENTS_OF } from '../../dndb-tables';
import WordOfPower from './word_of_power';
import WordSpace from './word_space';

export default function Wizcaster(props) {
    let { currentSpecials } = props;

    const [currentSpell, setCurrentSpell] = useState([]);

    function addWordToCurrentSpell(word, start) {
        let newCurrentSpell = currentSpell;
        start ? newCurrentSpell.unshift(word) : newCurrentSpell.push(word);
        setCurrentSpell([...newCurrentSpell]);
    }

    function removeWordFromCurrentSpell(index) {
        let newCurrentSpell = currentSpell
        newCurrentSpell.splice(index, 1);
        setCurrentSpell([...newCurrentSpell]);
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
                        <div>{w['word']}</div>
                        <button onClick={() => removeWordFromCurrentSpell(i)}>-</button>
                    </div>
                )
            })}
            {endSpace}
            </>
        )
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

    function wordsList() {
        if (currentSpecials.words) {
            let freeCategories = ["Form", "Element", "Verb"];
            currentSpell.forEach(spell => freeCategories.splice(freeCategories.indexOf(spell.category), 1));
            return (
                <ul>
                    {currentSpecials.words.map((obj, i) => {
                        
                        return (
                            <WordOfPower key={i} ind={i} word={obj} usable={freeCategories.includes(obj.category)} randomizeWord={randomizeWord} /> 
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
                </div>
                <div className="words-list">
                    {wordsList()}
                </div>
                <div>
                    <button className="randomize-button" onClick={randomizeWords}>Generate New Words</button>
                </div>
            </div>
        </div>
    )
}