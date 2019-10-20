import React from 'react';
import { CLASS_COLORS } from '../dndb-tables';
import Battlebro from './c_classes/battlebro';

export default function ClassMain(props) {
    const classColor = props.cClass ? CLASS_COLORS[props.cClass] : "white"

    function classComp() {
        let classComp;
        switch (props.cClass) {
            case "Battlebro":
                classComp = <Battlebro currentSpecials={props.currentSpecials} updateState={props.updateState} />
                break;
            default:
                classComp = <></>
        }
        return classComp;
    }

    return (
        <>
        <h2 id="class-headline" style={{backgroundColor: classColor}}>{props.cClass}</h2>
        <br/>
        {classComp()}
        </>
    )
}