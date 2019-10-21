import React, { useState } from 'react';
import { random, FORMS, GERUNDS, VERBS, ELEMENTS, ELEMENTS_OF } from '../../dndb-tables';
import WordOfPower from './word_of_power';

export default function Wizcaster(props) {
    let { currentSpecials } = props;
    
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
        props.updateState('currentSpecials', {'words': words});
    }

    function randomizeWord(num) {
        let words = currentSpecials.words;
        const newWord = createRandomWord();
        words[num] = newWord;
        props.updateState('currentSpecials', {'words': words});
    }

    function wordsList() {
        if (currentSpecials.words) {
            return (
                <ul>
                    {currentSpecials.words.map((obj, i) => {
                        return (
                            <WordOfPower key={i} ind={i} word={obj['word']} category={obj['category']} randomizeWord={randomizeWord} /> 
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