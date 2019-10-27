import React, { useState, useEffect } from 'react';

export default function CharSelect(props) {
    const [extend, setExtend] = useState(false);
    const [charsList, setCharsList] = useState([]);

    useEffect(() => {
        updateChars();
    }, []);

    function updateChars() {
        props.get().then(chars => setCharsList(chars))
    }

    function selectChar(char) {
        setExtend(false);
        props.loadCharacter(char)
    }

    function charsListDisp() {
        return (
            <div>
                <button onClick={updateChars}>Refresh Chars</button>
                <ul>
                    {charsList.map(char => {
                        return (
                            <li key={char.name} onClick={() => selectChar(char)}>
                                <div>{char.name}</div>
                                <div>{char.cClass}</div>
                                <div>Level: {char.level}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <>
        {extend ? 
        <div onClick={() => setExtend(extend ? false : true)}> >> </div> : 
        charsListDisp()}
        </>
    )
}