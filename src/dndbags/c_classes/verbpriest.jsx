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
            default:
                return
        }
    }

    function createWords() {
        let words = [];
        for (let i = 0; i < 6; i++) {
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
                <div className="class-desc">A speaker of sacred words that command both living and inanimate things.</div>
                <br />
                <div>Magic Ability:<br /><strong>Sacred Words</strong></div>
                <div>Whenever you rest, you recall 6 Words of Power in the ancient language of the gods.</div>
                <div>When you speak one of the Words at a creature or object, it is compelled to perform the action until completed or at least attempt to for a few minutes</div>
                <div>Simple safe commands work automatically but you may have to roll to:</div>
                <ul>
                    <li>Make a dangerous or self-destructive command of a living creature</li>
                    <li>Add additional words (targets, conditions, etc.) to the command</li>
                    <li>Control particularly large, heavy, or magical objects</li>
                </ul>
            </div>
            <div className="class-ability-display">
                <div id="word-list">
                    {wordsDisp()}
                </div>
                <div>
                    <button className="ability-randomize-button" onClick={createWords}>Generate Random Words</button>
                    <span>Add Word: </span><input type="text" ref={input}></input><button onClick={addCustomWord}>+</button>
                </div>
            </div>
        </div>
    )
}