import React from 'react';
import { random, VERBS, COMMANDS } from '../../dndb-tables';

export default function Verbpriest(props) {
    const { currentSpecials } = props;
    const input = React.createRef();

    function randomWord() {
        const wordCatName = random(["Verb", "Command"]);
        switch(wordCatName) {
            case "Verb":
                return random(VERBS);
            case "Command":
                return random(COMMANDS);
        }
    }

    function createWords() {
        let words = [];
        for (let i = 0; i < 5; i++) {
            words.push(randomWord());
        }
        props.updateState('currentSpecials', { 'words': words });
    }

    function addCustomWord() {
        let newWords = currentSpecials.words;
        newWords.push(input.current.value);
        props.updateState('currentSpecials', { 'words': newWords });
    }

    function speakWord(wordInd) {
        let newWords = currentSpecials.words;
        newWords.splice(wordInd, 1);
        props.updateState('currentSpecials', { 'words': newWords });
    }

    function wordsDisp() {
        if (currentSpecials.words) {
            return (
                <ul style={{ listStyle: 'none' }}>
                    {currentSpecials.words.map((w, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <div>{w}</div>
                                </li>
                                <button onClick={() => speakWord(i)}>Speak</button>
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
                <div id="word-list">
                    {wordsDisp()}
                </div>
                <div>
                    <button className="randomize-button" onClick={createWords}>Generate Random Words</button>
                    <span>Add Word: </span><input type="text" ref={input}></input><button onClick={addCustomWord}>+</button>
                </div>
            </div>
        </div>
    )
}